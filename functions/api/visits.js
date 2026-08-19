export async function onRequestGet(context) {
  try {
    const result = await context.env.DB.prepare(
      `SELECT
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
       FROM visits
       ORDER BY createdAt DESC`
    ).all();

    return Response.json({
      success: true,
      count: result.results.length,
      visits: result.results,
    });
  } catch (error) {
    console.error("GET /api/visits error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to load visits.",
      },
      { status: 500 }
    );
  }
}
