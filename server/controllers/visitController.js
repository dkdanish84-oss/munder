import Visit from "../models/Visit.js";

export const createVisit = async (req, res) => {
  try {
    const visit = await Visit.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Visit booked successfully",
      visit,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const myVisits = async (req, res) => {
  try {
    const visits = await Visit.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      visits,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

