import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("SUPABASE ENV MISSING", {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
  });
}

const supabase = createClient(
  supabaseUrl || "",
  supabaseServiceKey || ""
);

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configuration Supabase manquante dans Vercel." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const slug = String(body.slug || "").trim();
    const files = Array.isArray(body.files) ? body.files : [];

    if (!slug) {
      return NextResponse.json({ error: "Slug manquant." }, { status: 400 });
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "Aucune photo." }, { status: 400 });
    }

    const { data: delivery, error: deliveryError } = await supabase
      .from("qlyk_deliveries")
      .upsert(
        {
          slug,
          client_name: slug,
          vehicle: "À compléter",
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (deliveryError || !delivery) {
      console.error("DELIVERY ERROR:", deliveryError);
      return NextResponse.json(
        { error: deliveryError?.message || "Erreur livraison." },
        { status: 500 }
      );
    }

    const { error: deleteError } = await supabase
      .from("qlyk_delivery_photos")
      .delete()
      .eq("delivery_id", delivery.id);

    if (deleteError) {
      console.error("DELETE PHOTOS ERROR:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    const photos = files.map((file: { url: string }, index: number) => ({
      delivery_id: delivery.id,
      photo_url: file.url,
      position: index,
    }));

    const { error: photosError } = await supabase
      .from("qlyk_delivery_photos")
      .insert(photos);

    if (photosError) {
      console.error("PHOTOS ERROR:", photosError);
      return NextResponse.json({ error: photosError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("QLYK DELIVERY API ERROR:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur." },
      { status: 500 }
    );
  }
}
