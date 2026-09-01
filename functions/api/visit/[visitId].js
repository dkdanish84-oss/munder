export async function onRequestPatch(context) {
  try {
    const visitId = String(context.params.visitId || "").trim();

    if (!visitId) {
      return Response.json(
        {
          success: false,
          message: "Visit ID is required.",
        },
        { status: 400 }
      );
    }

    const body = await context.request.json();

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Gardener Assigned",
      "Visit Scheduled",
      "Completed",
      "Cancelled",
    ];

    const status = body?.status;

    if (
      status !== undefined &&
      status !== null &&
      !allowedStatuses.includes(status)
    ) {
      return Response.json(
        {
          success: false,
          message: "Invalid visit status.",
        },
        { status: 400 }
      );
    }

    const existing = await context.env.DB
      .prepare("SELECT * FROM visits WHERE visitId = ?")
      .bind(visitId)
      .first();

    if (!existing) {
      return Response.json(
        {
          success: false,
          message: "Visit request not found.",
        },
        { status: 404 }
      );
    }

    const newStatus =
      status !== undefined && status !== null
        ? status
        : existing.status;

    const newAssignedGardener =
      body?.assignedGardener !== undefined
        ? body.assignedGardener
        : existing.assignedGardener;

    const updatedAt = new Date().toISOString();

    await context.env.DB
      .prepare(`
        UPDATE visits
        SET status = ?, assignedGardener = ?, updatedAt = ?
        WHERE visitId = ?
      `)
      .bind(
        newStatus,
        newAssignedGardener ?? null,
        updatedAt,
        visitId
      )
      .run();

    const updatedVisit = await context.env.DB
      .prepare("SELECT * FROM visits WHERE visitId = ?")
      .bind(visitId)
      .first();

    return Response.json({
      success: true,
      message: "Visit updated successfully.",
      visit: updatedVisit,
    });

  } catch (error) {
    console.error("Visit update failed:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to update visit.",
      },
      { status: 500 }
    );
  }
}
