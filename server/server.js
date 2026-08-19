import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* =========================================================
   FILE STORAGE
========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "data");
const visitsFile = path.join(dataDir, "visits.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(visitsFile)) {
  fs.writeFileSync(visitsFile, "[]", "utf8");
}

function readVisits() {
  try {
    const data = fs.readFileSync(visitsFile, "utf8");
    const visits = JSON.parse(data);

    return Array.isArray(visits) ? visits : [];
  } catch (error) {
    console.error("Visit storage read error:", error);
    return [];
  }
}

function writeVisits(visits) {
  fs.writeFileSync(
    visitsFile,
    JSON.stringify(visits, null, 2),
    "utf8"
  );
}

function createVisitId() {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `VIS-${date}-${random}`;
}

/* =========================================================
   RAZORPAY CONFIG
========================================================= */

if (!process.env.RAZORPAY_KEY_ID) {
  console.error(
    "RAZORPAY_KEY_ID is missing in .env"
  );
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  console.error(
    "RAZORPAY_KEY_SECRET is missing in .env"
  );
}

const razorpay = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

/* =========================================================
   PLAN PRICES
========================================================= */

const PLAN_PRICES = {
  "Basic Care Plan": 999,
  "Pro Garden Plan": 1999,
  "Ultimate Estate Plan": 3999,
};

/* =========================================================
   HEALTH
========================================================= */

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Munder API is running",
  });
});

/* =========================================================
   CREATE VISIT
========================================================= */

app.post("/api/visit", (req, res) => {
  try {
    const {
      name,
      mobile,
      address = "",
      gardenType = "Small",
      service = "Garden Maintenance",
      visitDate,
      visitTime = "Morning",
      notes = "",
      photo = "",
    } = req.body || {};

    const cleanName = String(name || "").trim();

    const cleanMobile = String(mobile || "")
      .replace(/\D/g, "");

    const cleanAddress = String(address || "")
      .trim();

    const cleanDate = String(visitDate || "")
      .trim();

    if (
      !cleanName ||
      !cleanMobile ||
      !cleanAddress
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, mobile and address are required.",
      });
    }

    if (!/^\d{10}$/.test(cleanMobile)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid 10-digit mobile number.",
      });
    }

    const visits = readVisits();

    const visit = {
      visitId: createVisitId(),

      name: cleanName,

      mobile: cleanMobile,

      address: cleanAddress,

      gardenType:
        String(gardenType || "Small"),

      service:
        String(
          service ||
          "Garden Maintenance"
        ),

      visitDate: cleanDate || null,

      visitTime:
        String(
          visitTime ||
          "Morning"
        ),

      notes:
        String(notes || "").trim(),

      photo:
        typeof photo === "string"
          ? photo
          : "",

      status: "Pending",

      assignedGardener: null,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    visits.unshift(visit);

    writeVisits(visits);

    console.log("");
    console.log(
      "======================================"
    );
    console.log(" NEW VISIT REQUEST");
    console.log(
      "======================================"
    );
    console.log(
      `Visit ID : ${visit.visitId}`
    );
    console.log(
      `Name     : ${visit.name}`
    );
    console.log(
      `Mobile   : ${visit.mobile}`
    );
    console.log(
      `Date     : ${visit.visitDate}`
    );
    console.log(
      `Status   : ${visit.status}`
    );
    console.log(
      "======================================"
    );
    console.log("");

    return res.status(201).json({
      success: true,

      message:
        "Visit request received successfully.",

      visit,
    });

  } catch (error) {

    console.error(
      "Visit creation failed:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to save visit request.",
    });
  }
});

/* =========================================================
   GET ALL VISITS
========================================================= */

app.get("/api/visits", (req, res) => {
  try {

    const visits = readVisits();

    return res.json({
      success: true,
      count: visits.length,
      visits,
    });

  } catch (error) {

    console.error(
      "Visit list failed:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load visit requests.",
    });
  }
});

/* =========================================================
   GET SINGLE VISIT
========================================================= */

app.get(
  "/api/visit/:visitId",
  (req, res) => {

    const visits = readVisits();

    const visit = visits.find(
      (item) =>
        item.visitId ===
        req.params.visitId
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message:
          "Visit request not found.",
      });
    }

    return res.json({
      success: true,
      visit,
    });
  }
);

/* =========================================================
   UPDATE VISIT
========================================================= */

app.patch(
  "/api/visit/:visitId",
  (req, res) => {

    try {

      const visits = readVisits();

      const index =
        visits.findIndex(
          (item) =>
            item.visitId ===
            req.params.visitId
        );

      if (index === -1) {

        return res.status(404).json({
          success: false,
          message:
            "Visit request not found.",
        });
      }

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Gardener Assigned",
        "Visit Scheduled",
        "Completed",
        "Cancelled",
      ];

      const status =
        req.body?.status;

      if (
        status &&
        !allowedStatuses.includes(status)
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid visit status.",
        });
      }

      visits[index] = {
        ...visits[index],

        ...(status
          ? { status }
          : {}),

        ...(req.body
          ?.assignedGardener !==
        undefined
          ? {
              assignedGardener:
                req.body
                  .assignedGardener,
            }
          : {}),

        updatedAt:
          new Date().toISOString(),
      };

      writeVisits(visits);

      return res.json({
        success: true,

        message:
          "Visit updated successfully.",

        visit: visits[index],
      });

    } catch (error) {

      console.error(
        "Visit update failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update visit.",
      });
    }
  }
);

/* =========================================================
   RAZORPAY ORDER
========================================================= */

app.post(
  "/api/v1/razorpay/order",
  async (req, res) => {

    try {

      const {
        planName,
        months = 1,
        customer = {},
      } = req.body;

      if (
        !planName ||
        !PLAN_PRICES[planName]
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid plan selected.",
        });
      }

      const parsedMonths =
        Number(months);

      if (
        !Number.isInteger(
          parsedMonths
        ) ||
        parsedMonths < 1 ||
        parsedMonths > 24
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid subscription duration.",
        });
      }

      const monthlyPrice =
        PLAN_PRICES[planName];

      const subtotal =
        monthlyPrice *
        parsedMonths;

      const gst =
        Math.round(
          subtotal * 0.18
        );

      const grandTotal =
        subtotal + gst;

      const amountInPaise =
        grandTotal * 100;

      const receipt =
        `MUNDER_${Date.now()}`;

      const razorpayOrder =
        await razorpay.orders.create({
          amount:
            amountInPaise,

          currency:
            "INR",

          receipt,

          notes: {
            plan: planName,

            months:
              String(
                parsedMonths
              ),

            customer_name:
              customer?.name || "",

            customer_phone:
              customer?.phone || "",
          },

        });

      res.json({
        success: true,

        order: {
          id:
            razorpayOrder.id,

          amount:
            razorpayOrder.amount,

          currency:
            razorpayOrder.currency,

          receipt:
            razorpayOrder.receipt,
        },

        pricing: {
          planName,

          monthlyPrice,

          months:
            parsedMonths,

          subtotal,

          gst,

          grandTotal,
        },

        keyId:
          process.env.RAZORPAY_KEY_ID,
      });

    } catch (error) {

      console.error(
        "Razorpay order creation failed:",
        error?.error || error
      );

      res.status(500).json({
        success: false,

        message:
          error?.error?.description ||
          "Unable to create Razorpay order.",
      });
    }
  }
);

/* =========================================================
   VERIFY RAZORPAY PAYMENT
========================================================= */

app.post(
  "/api/v1/razorpay/verify",
  async (req, res) => {

    try {

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {

        return res.status(400).json({
          success: false,

          message:
            "Incomplete payment verification data.",
        });
      }

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            `${razorpay_order_id}|${razorpay_payment_id}`
          )
          .digest("hex");

      const receivedBuffer =
        Buffer.from(
          razorpay_signature,
          "utf8"
        );

      const generatedBuffer =
        Buffer.from(
          generatedSignature,
          "utf8"
        );

      const isValid =
        receivedBuffer.length ===
          generatedBuffer.length &&
        crypto.timingSafeEqual(
          receivedBuffer,
          generatedBuffer
        );

      if (!isValid) {

        return res.status(400).json({
          success: false,

          message:
            "Payment signature verification failed.",
        });
      }

      res.json({
        success: true,

        message:
          "Payment verified successfully.",

        paymentId:
          razorpay_payment_id,

        orderId:
          razorpay_order_id,
      });

    } catch (error) {

      console.error(
        "Payment verification error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Payment verification failed.",
      });
    }
  }
);

/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {

  console.log("");

  console.log(
    "======================================"
  );

  console.log(
    " MUNDER API SERVER"
  );

  console.log(
    "======================================"
  );

  console.log(
    ` Server: http://localhost:${PORT}`
  );

  console.log(
    ` Health: http://localhost:${PORT}/api/v1/health`
  );

  console.log(
    ` Visits: http://localhost:${PORT}/api/visits`
  );

  console.log("");
});


