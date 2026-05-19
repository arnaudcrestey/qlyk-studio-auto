import { NextResponse } from "next/server";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type DeliveryFile = {
  url?: string;
  ufsUrl?: string;
  name?: string;
  size?: number;
};

function getFileUrl(file: DeliveryFile) {
  return file.ufsUrl || file.url || "";
}

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Variables Supabase manquantes." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const slug = String(body.slug || "").trim();
    const deliveryLabel = String(body.deliveryLabel || "").trim();
    const files: DeliveryFile[] = Array.isArray(body.files)
      ? body.files.filter((file: DeliveryFile) => getFileUrl(file))
      : [];

    if (!slug) {
      return NextResponse.json({ error: "Slug manquant." }, { status: 400 });
    }

    if (!deliveryLabel) {
      return NextResponse.json(
        { error: "Dossier / lot livré manquant." },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "Aucune photo." }, { status: 400 });
    }

    const deliveryResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_deliveries?on_conflict=slug`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          slug,
          client_name: slug,
          vehicle: "",
          delivery_label: deliveryLabel,
        }),
      }
    );

    const deliveryText = await deliveryResponse.text();

    if (!deliveryResponse.ok) {
      return NextResponse.json(
        { error: `Erreur livraison Supabase : ${deliveryText}` },
        { status: 500 }
      );
    }

    const delivery = JSON.parse(deliveryText)[0];

    if (!delivery?.id) {
      return NextResponse.json(
        { error: "Livraison Supabase introuvable après création." },
        { status: 500 }
      );
    }

    const deleteResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_delivery_photos?delivery_id=eq.${delivery.id}`,
      {
        method: "DELETE",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      const deleteText = await deleteResponse.text();

      return NextResponse.json(
        { error: `Erreur suppression photos : ${deleteText}` },
        { status: 500 }
      );
    }

    const photos = files.map((file, index) => ({
      delivery_id: delivery.id,
      photo_url: getFileUrl(file),
      file_name: file.name || "",
      file_size: file.size || 0,
      position: index,
    }));

    const photosResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_delivery_photos`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photos),
      }
    );

    if (!photosResponse.ok) {
      const photosText = await photosResponse.text();

      return NextResponse.json(
        { error: `Erreur photos Supabase : ${photosText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slug,
      deliveryLabel,
      photoCount: files.length,
    });
  } catch (error) {
    console.error("QLYK DELIVERY ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Erreur serveur : ${error.message}`
            : "Erreur serveur inconnue.",
      },
      { status: 500 }
    );
  }
}
