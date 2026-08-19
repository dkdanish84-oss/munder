export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const {
      name,
      mobile,
      address = "",
      gardenType = "Small",
      service = "Garden Maintenance",
      visitDate = null,
      visitTime = "Morning",
      notes = "",
      photo = "",
    } = body || {};

    const cleanName = String(name || "").trim();
    const cleanMobile = String(mobile || "").replace(/\D/g, "");
    const cleanAddress = String(address || "").trim();

    if (!cleanName || !cleanMobile || !cleanAddress) {
      return Response.json(
        {
          success: false,
          message: "Name, mobile and address are required.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(cleanMobile)) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid 10-digit mobile number.",
        },
        { status: 400 }
      );
    }

    const visitId =
      "VIS-" +
      new Date().toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const now = new Date().toISOString();

    const sql = `
      INSERT INTO visits (
        visitId,
        name,
        mobile,
        address,
        gardenType,
        service,
        visitDate,
        visitTime,
        notes,
        photo,
        status,
        assignedGardener,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await context.env.DB.prepare(sql)
      .bind(
        visitId,
        cleanName,
        cleanMobile,
        cleanAddress,
        String(gardenType || "Small"),
        String(service || "Garden Maintenance"),
        visitDate ? String(visitDate) : null,
        String(visitTime || "Morning"),
        String(notes || "").trim(),
        typeof photo === "string" ? photo : "",
        "Pending",
        null,
        now,
        now
      )
      .run();

    return Response.json({
      success: true,
      message: "Visit request received successfully.",
      visit: {
        visitId,
        name: cleanName,
        mobile: cleanMobile,
        address: cleanAddress,
        gardenType: String(gardenType || "Small"),
        service: String(service || "Garden Maintenance"),
        visitDate: visitDate ? String(visitDate) : null,
        visitTime: String(visitTime || "Morning"),
        notes: String(notes || "").trim(),
        photo: typeof photo === "string" ? photo : "",
        status: "Pending",
        assignedGardener: null,
        createdAt: now,
        updatedAt: now,
      },
    });
  } catch (error) {
    console.error("POST /api/visit error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to submit visit request.",
      },
      { status: 500 }
    );
  }
}
