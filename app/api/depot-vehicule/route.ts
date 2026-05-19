import { NextResponse } from "next/server";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Variables Supabase manquantes." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const uploadedFiles = Array.isArray(body.uploadedFiles)
      ? body.uploadedFiles
      : [];

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { error: "Aucune photo envoyée." },
        { status: 400 }
      );
    }

    const depositPayload = {
      first_name: body.firstName || "",
      last_name: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",
      dealership: body.dealership || "",
      vehicle_type: body.vehicleType || "",
      brand_model: body.brandModel || "",
      year: body.year || "",
      objective: body.objective || "",
      requested_style: body.requestedStyle || "",
      message: body.message || "",
      offer: body.offer || "essentiel",
    };

    const depositResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_vehicle_deposits`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(depositPayload),
      }
    );

    const depositText = await depositResponse.text();

    if (!depositResponse.ok) {
      return NextResponse.json(
        {
          error: `Erreur dépôt Supabase : ${depositText}`,
        },
        { status: 500 }
      );
    }

    const deposit = JSON.parse(depositText)[0];

    const photosPayload = uploadedFiles.map(
      (
        file: {
          url: string;
          name?: string;
          size?: number;
        },
        index: number
      ) => ({
        deposit_id: deposit.id,
        photo_url: file.url,
        file_name: file.name || "",
        file_size: file.size || 0,
        position: index,
      })
    );

    const photosResponse = await fetch(
      `${supabaseUrl}/rest/v1/qlyk_vehicle_deposit_photos`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photosPayload),
      }
    );

    if (!photosResponse.ok) {
      const photosText = await photosResponse.text();

      return NextResponse.json(
        {
          error: `Erreur photos Supabase : ${photosText}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DEPOT VEHICULE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur.",
      },
      { status: 500 }
    );
  }
}
