import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const slug = body.slug?.trim();
    const files = body.files ?? [];

    if (!slug) {
      return NextResponse.json(
        { error: "Slug manquant." },
        { status: 400 }
      );
    }

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: "Aucune photo." },
        { status: 400 }
      );
    }

    const { data: delivery, error: deliveryError } = await supabase
      .from("qlyk_deliveries")
      .upsert(
        {
          slug,
          client_name: slug,
          vehicle: "À compléter",
        },
        {
          onConflict: "slug",
        }
      )
      .select("id")
      .single();

    if (deliveryError || !delivery) {
      console.error("DELIVERY ERROR:", deliveryError);

      return NextResponse.json(
        {
          error: deliveryError?.message || "Erreur livraison.",
        },
        { status: 500 }
      );
    }

    await supabase
      .from("qlyk_delivery_photos")
      .delete()
      .eq("delivery_id", delivery.id);

    const photos = files.map(
      (file: { url: string }, index: number) => ({
        delivery_id: delivery.id,
        photo_url: file.url,
        position: index,
      })
    );

    const { error: photosError } = await supabase
      .from("qlyk_delivery_photos")
      .insert(photos);

    if (photosError) {
      console.error("PHOTOS ERROR:", photosError);

      return NextResponse.json(
        {
          error: photosError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("QYLK DELIVERY API ERROR:", error);

    return NextResponse.json(
      {
        error: "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}
