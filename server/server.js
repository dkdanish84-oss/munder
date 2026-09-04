import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* =========================================================
   MAIN ADMIN LOGIN
========================================================= */

app.post("/api/v1/admin/login", async (req, res) => {
  try {
    const {
      adminId,
      password,
    } = req.body || {};

    const expectedAdminId =
      process.env.MUNDER_ADMIN_ID || "mainadmin";

    const expectedPassword =
      process.env.MUNDER_ADMIN_PASSWORD;

    if (
      !expectedPassword ||
      !process.env.MUNDER_JWT_SECRET
    ) {
      return res.status(500).json({
        success: false,
        message:
          "Admin authentication is not configured.",
      });
    }

    if (
      String(adminId || "").trim() !==
      expectedAdminId
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Admin ID or Password.",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        String(password || ""),
        expectedPassword
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Admin ID or Password.",
      });
    }

    const token = jwt.sign(
      {
        id: expectedAdminId,
        role: "MAIN_ADMIN",
        name: "Main Administrator",
      },
      process.env.MUNDER_JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    return res.json({
      success: true,
      message: "Admin login successful.",
      token,
      admin: {
        id: expectedAdminId,
        role: "MAIN_ADMIN",
        name: "Main Administrator",
      },
    });
  } catch (error) {
    console.error(
      "Admin login failed:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to complete admin login.",
    });
  }
});

/* =========================================================
   FIREBASE ADMIN AUTH
========================================================= */

const firebaseServiceAccountPath =
  path.join(
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
      path.join(
        process.env.USERPROFILE || "",
        "Downloads",
        "munder-6933d-firebase-adminsdk-fbsvc-942c9c026f.json"
      )
  );

try {
  if (getApps().length === 0) {
    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey:
            process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });

      console.log("Firebase Admin: Environment credentials");
    } else if (fs.existsSync(firebaseServiceAccountPath)) {
      const serviceAccount =
        JSON.parse(
          fs.readFileSync(
            firebaseServiceAccountPath,
            "utf8"
          )
        );

      initializeApp({
        credential:
          cert(serviceAccount),
      });

      console.log(
        "Firebase Admin: Local service-account file"
      );
    } else {
      console.error(
        "Firebase Admin credentials are missing."
      );
    }
  }
} catch (error) {
  console.error(
    "Firebase Admin initialization failed:",
    error
  );
}

async function verifyFirebaseToken(req, res, next) {
  try {
    const authorization =
      req.headers.authorization || "";

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const token =
      authorization.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing.",
      });
    }

    if (getApps().length === 0) {
      return res.status(500).json({
        success: false,
        message:
          "Firebase Admin authentication is not configured.",
      });
    }

    req.firebaseUser =
      await getAuth().verifyIdToken(token);

    next();
  } catch (error) {
    console.error(
      "Firebase token verification failed:",
      error?.message || error
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
}

/* =========================================================
   FILE STORAGE
========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "data");
const visitsFile = path.join(dataDir, "visits.json");
const customersFile = path.join(dataDir, "customers.json");
const subscriptionsFile = path.join(dataDir, "subscriptions.json");
const paymentsFile = path.join(dataDir, "payments.json");
const gardenersFile = path.join(dataDir, "gardeners.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(customersFile)) {
  fs.writeFileSync(customersFile, "[]", "utf8");
}

if (!fs.existsSync(subscriptionsFile)) {
  fs.writeFileSync(subscriptionsFile, "[]", "utf8");
}

if (!fs.existsSync(paymentsFile)) {
  fs.writeFileSync(paymentsFile, "[]", "utf8");
}
if (!fs.existsSync(visitsFile)) {
  fs.writeFileSync(visitsFile, "[]", "utf8");
}


/* =========================================================
   GARDENER STORAGE + ROLE AUTHORIZATION
========================================================= */

if (!fs.existsSync(gardenersFile)) {
  fs.writeFileSync(
    gardenersFile,
    "[]",
    "utf8"
  );
}

function readGardeners() {
  try {
    const data =
      fs.readFileSync(
        gardenersFile,
        "utf8"
      );

    const parsed =
      JSON.parse(data);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Gardener storage read error:",
      error
    );

    return [];
  }
}

function writeGardeners(gardeners) {
  fs.writeFileSync(
    gardenersFile,
    JSON.stringify(
      gardeners,
      null,
      2
    ),
    "utf8"
  );
}

function getAdminUids() {
  return String(
    process.env.MUNDER_ADMIN_UIDS || ""
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getAdminEmails() {
  return String(
    process.env.MUNDER_ADMIN_EMAILS || ""
  )
    .split(",")
    .map((value) =>
      value.trim().toLowerCase()
    )
    .filter(Boolean);
}

async function verifyAdmin(req, res, next) {
  try {
    const authHeader =
      String(req.headers.authorization || "");

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication token is required.",
      });
    }

    const token =
      authHeader.substring(7);

    const decoded =
      jwt.verify(
        token,
        process.env.MUNDER_JWT_SECRET
      );

    if (
      decoded.role !== "MAIN_ADMIN" ||
      decoded.id !==
        (process.env.MUNDER_ADMIN_ID || "mainadmin")
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    req.userRole = "admin";
    req.admin = decoded;

    return next();

  } catch (error) {
    console.error(
      "Admin authorization failed:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin session.",
    });
  }
}
async function verifyGardener(req, res, next) {
  try {
    await verifyFirebaseToken(
      req,
      res,
      () => {}
    );

    if (!req.firebaseUser) {
      return;
    }

    const uid =
      req.firebaseUser.uid;

    const gardeners =
      readGardeners();

    const gardener =
      gardeners.find(
        (item) =>
          item.uid === uid &&
          item.active !== false
      );

    if (!gardener) {
      return res.status(403).json({
        success: false,
        message:
          "Gardener access required.",
      });
    }

    req.userRole = "gardener";
    req.gardener = gardener;

    return next();
  } catch (error) {
    console.error(
      "Gardener authorization failed:",
      error
    );

    return res.status(403).json({
      success: false,
      message:
        "Gardener authorization failed.",
    });
  }
}

function createGardenerId() {
  return `GARD-${Date.now()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
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

/* =========================================================
   AUTOMATIC VISIT CATEGORY SYSTEM
========================================================= */

function getVisitCategory(status) {
  const normalizedStatus = String(status || "")
    .trim()
    .toLowerCase();

  if (normalizedStatus === "completed") {
    return "CUSTOMER";
  }

  if (normalizedStatus === "cancelled") {
    return "FUTURE_LEAD";
  }

  return "LEAD";
}

function writeVisits(visits) {
  fs.writeFileSync(
    visitsFile,
    JSON.stringify(visits, null, 2),
    "utf8"
  );
}

function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`JSON storage read error: ${filePath}`, error);
    return [];
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

function createSubscriptionId() {
  return `SUB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function createPaymentRecordId() {
  return `PAY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + Number(months));
  return result;
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
   AUTOMATIC CUSTOMER VISIT SCHEDULER
========================================================= */

function getAutomaticVisitDays(planName, isRenewal) {
  const normalizedPlan = String(planName || "")
    .trim()
    .toLowerCase();

  // First visit after a new plan purchase.
  if (!isRenewal) {
    return 7;
  }

  // Basic Care Plan / ?999 renewal.
  if (
    normalizedPlan === "basic care plan" ||
    normalizedPlan.includes("basic care")
  ) {
    return 15;
  }

  // Other renewal plans.
  return 7;
}

function createAutomaticCustomerVisit({
  customer,
  subscription,
  isRenewal = false,
}) {
  if (!customer?.uid) {
    throw new Error(
      "Customer UID is required for automatic visit."
    );
  }

  if (!subscription?.subscriptionId) {
    throw new Error(
      "Subscription ID is required for automatic visit."
    );
  }

  const visits = readVisits();

  // Prevent duplicate visit for the same subscription.
  const existingVisit = visits.find(
    (visit) =>
      visit.uid === customer.uid &&
      visit.subscriptionId === subscription.subscriptionId
  );

  if (existingVisit) {
    return existingVisit;
  }

  const now = new Date();

  const days = getAutomaticVisitDays(
    subscription.planName,
    isRenewal
  );

  const visitDate = new Date(now);

  visitDate.setDate(
    visitDate.getDate() + Number(days)
  );

  const visit = {
    visitId: createVisitId(),

    uid: customer.uid,

    customerId:
      customer.customerId || null,

    subscriptionId:
      subscription.subscriptionId,

    planName:
      subscription.planName || "",

    name:
      customer.name || "",

    mobile:
      customer.phone || "",

    address:
      customer.address || "",

    gardenType:
      customer.gardenType || "Small",

    service:
      "Garden Maintenance",

    visitDate:
      visitDate.toISOString().slice(0, 10),

    visitTime:
      "Morning",

    notes:
      isRenewal
        ? "Automatically scheduled renewal visit."
        : "Automatically scheduled first plan visit.",

    photo: "",

    status: "Pending",

    assignedGardener: null,

    assignmentType: "AUTO",

    isRenewal,

    schedulingWindowDays: days,

    createdAt:
      now.toISOString(),

    updatedAt:
      now.toISOString(),
  };

  visits.unshift(visit);

  writeVisits(visits);

  console.log("");
  console.log("======================================");
  console.log(" AUTOMATIC CUSTOMER VISIT CREATED");
  console.log("======================================");
  console.log(`Visit ID    : ${visit.visitId}`);
  console.log(`UID         : ${visit.uid}`);
  console.log(`Customer ID : ${visit.customerId}`);
  console.log(`Subscription: ${visit.subscriptionId}`);
  console.log(`Plan        : ${visit.planName}`);
  console.log(`Renewal     : ${visit.isRenewal}`);
  console.log(`Visit Date  : ${visit.visitDate}`);
  console.log(`Window      : ${visit.schedulingWindowDays} days`);
  console.log(`Assignment  : ${visit.assignmentType}`);
  console.log("======================================");
  console.log("");

  return visit;
}

/* =========================================================
   CUSTOMER VISITS API
========================================================= */

app.get(
  "/api/v1/customer/visits",
  verifyFirebaseToken,
  (req, res) => {
    try {
      const uid = req.firebaseUser?.uid;

      if (!uid) {
        return res.status(401).json({
          success: false,
          message:
            "Customer authentication required.",
        });
      }

      const visits = readVisits()
        .filter(
          (visit) =>
            visit.uid === uid
        )
        .sort((a, b) => {
          const aTime = a.visitDate
            ? new Date(a.visitDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          const bTime = b.visitDate
            ? new Date(b.visitDate).getTime()
            : Number.MAX_SAFE_INTEGER;

          return aTime - bTime;
        });

      return res.json({
        success: true,
        count: visits.length,
        visits,
      });
    } catch (error) {
      console.error(
        "Customer visits failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load customer visits.",
      });
    }
  }
);
/* =========================================================
   CUSTOMER API
========================================================= */

app.get(
  "/api/v1/customer/me",
  verifyFirebaseToken,
  (req, res) => {
    try {
      const data = fs.readFileSync(customersFile, "utf8");
      const customers = JSON.parse(data);

      const customer = Array.isArray(customers)
        ? customers.find(
            (item) => item.uid === req.firebaseUser.uid
          )
        : null;

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer account not found.",
        });
      }

      return res.json({
        success: true,
        customer,
      });
    } catch (error) {
      console.error("Customer lookup error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to load customer account.",
      });
    }
  }
);

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
  // Customer Dashboard plans
  "Basic Care": 999,
  "Premium Care": 1999,
  "Complete Care": 2999,

  // Legacy plan names - keep existing payment flow working
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

      category: getVisitCategory("Pending"),

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


/* =========================================================
   ADMIN CUSTOMERS API
   A customer is anyone who has successfully purchased
   at least one plan or paid service.
========================================================= */

app.get("/api/admin/customers", verifyAdmin, (req, res) => {
  try {
    const customersFile = path.join(__dirname, "data", "customers.json");

    if (!fs.existsSync(customersFile)) {
      return res.json([]);
    }

    const customers = JSON.parse(
      fs.readFileSync(customersFile, "utf8") || "[]"
    );

    const actualCustomers = customers.filter((customer) => {
      if (!customer) return false;

      const hasPlan = !!customer.plan;

      const hasSuccessfulPayment =
        customer.lastPayment &&
        customer.lastPayment.status === "PAID";

      // Customer remains a customer permanently after
      // a successful plan/service purchase.
      return hasPlan || hasSuccessfulPayment;
    });

    return res.json(actualCustomers);

  } catch (error) {
    console.error("ADMIN CUSTOMERS API ERROR:", error);

    return res.status(500).json({
      message: "Unable to load customers",
    });
  }
});

/* =========================================================
   ADMIN LEADS API
   Visit/enquiry users who have not purchased a paid
   plan or service are shown as leads.
========================================================= */

app.get("/api/admin/leads", verifyAdmin, (req, res) => {
  try {
    const visitsFile = path.join(__dirname, "data", "visits.json");
    const customersFile = path.join(__dirname, "data", "customers.json");
    const paymentsFile = path.join(__dirname, "data", "payments.json");

    const visits = fs.existsSync(visitsFile)
      ? JSON.parse(fs.readFileSync(visitsFile, "utf8") || "[]")
      : [];

    const customers = fs.existsSync(customersFile)
      ? JSON.parse(fs.readFileSync(customersFile, "utf8") || "[]")
      : [];

    const payments = fs.existsSync(paymentsFile)
      ? JSON.parse(fs.readFileSync(paymentsFile, "utf8") || "[]")
      : [];

    // Users who have successfully purchased something
    const purchasedUids = new Set(
      payments
        .filter((payment) => payment?.status === "PAID")
        .map((payment) => String(payment.uid || ""))
        .filter(Boolean)
    );

    const purchasedCustomerIds = new Set(
      payments
        .filter((payment) => payment?.status === "PAID")
        .map((payment) => String(payment.customerId || ""))
        .filter(Boolean)
    );

    customers.forEach((customer) => {
      if (
        customer &&
        (
          customer.plan ||
          customer.lastPayment?.status === "PAID"
        )
      ) {
        if (customer.uid) {
          purchasedUids.add(String(customer.uid));
        }

        if (customer.customerId) {
          purchasedCustomerIds.add(
            String(customer.customerId)
          );
        }
      }
    });

    // Only non-purchased visit records remain leads
    const leads = visits.filter((visit) => {
      if (!visit) return false;

      const uid = String(visit.uid || "");
      const customerId = String(
        visit.customerId || ""
      );

      return (
        !purchasedUids.has(uid) &&
        !purchasedCustomerIds.has(customerId)
      );
    });

    return res.json({
      success: true,
      count: leads.length,
      leads,
    });

  } catch (error) {
    console.error("ADMIN LEADS API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load leads",
    });
  }
});
app.get("/api/visits", verifyAdmin, (req, res) => {
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
          ? {
              status,
              category:
                getVisitCategory(status),
            }
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
   ADMIN + GARDENER MANAGEMENT APIs
========================================================= */

/* -------------------------
   ADMIN: LIST GARDENERS
------------------------- */

app.get(
  "/api/v1/admin/gardeners",
  verifyAdmin,
  (req, res) => {
    try {
      const gardeners =
        readGardeners();

      return res.json({
        success: true,
        count: gardeners.length,
        gardeners,
      });
    } catch (error) {
      console.error(
        "Admin gardener list failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load gardeners.",
      });
    }
  }
);

/* -------------------------
   ADMIN: CREATE GARDENER
------------------------- */

app.post(
  "/api/v1/admin/gardeners",
  verifyAdmin,
  (req, res) => {
    try {
      const {
        uid,
        name,
        email = "",
        phone = "",
      } = req.body || {};

      const cleanUid =
        String(uid || "").trim();

      const cleanName =
        String(name || "").trim();

      if (!cleanUid || !cleanName) {
        return res.status(400).json({
          success: false,
          message:
            "Gardener Firebase UID and name are required.",
        });
      }

      const gardeners =
        readGardeners();

      const existing =
        gardeners.find(
          (item) =>
            item.uid === cleanUid
        );

      if (existing) {
        return res.status(409).json({
          success: false,
          message:
            "Gardener already exists.",
          gardener: existing,
        });
      }

      const now =
        new Date().toISOString();

      const gardener = {
        gardenerId:
          createGardenerId(),

        uid:
          cleanUid,

        name:
          cleanName,

        email:
          String(email || "").trim(),

        phone:
          String(phone || "").trim(),

        role:
          "gardener",

        active:
          true,

        createdAt:
          now,

        updatedAt:
          now,
      };

      gardeners.unshift(
        gardener
      );

      writeGardeners(
        gardeners
      );

      return res.status(201).json({
        success: true,
        message:
          "Gardener created successfully.",
        gardener,
      });
    } catch (error) {
      console.error(
        "Gardener creation failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to create gardener.",
      });
    }
  }
);

/* -------------------------
   ADMIN: LIST ALL VISITS
------------------------- */

app.get(
  "/api/v1/admin/visits",
  verifyAdmin,
  (req, res) => {
    try {
      const visits =
        readVisits();

      return res.json({
        success: true,
        count: visits.length,
        visits,
      });
    } catch (error) {
      console.error(
        "Admin visits failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load admin visits.",
      });
    }
  }
);

/* -------------------------
   ADMIN: ASSIGN / UPDATE VISIT
------------------------- */

app.patch(
  "/api/v1/admin/visits/:visitId",
  verifyAdmin,
  (req, res) => {
    try {
      const visits =
        readVisits();

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
            "Visit not found.",
        });
      }

      const current =
        visits[index];

      const body =
        req.body || {};

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Gardener Assigned",
        "Visit Scheduled",
        "In Progress",
        "Completed",
        "Cancelled",
      ];

      if (
        body.status &&
        !allowedStatuses.includes(
          body.status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid visit status.",
        });
      }

      let assignedGardener =
        current.assignedGardener;

      if (
        body.gardenerId !== undefined
      ) {
        const gardeners =
          readGardeners();

        const gardener =
          gardeners.find(
            (item) =>
              item.gardenerId ===
                body.gardenerId &&
              item.active !== false
          );

        if (!gardener) {
          return res.status(400).json({
            success: false,
            message:
              "Gardener not found or inactive.",
          });
        }

        assignedGardener = {
          gardenerId:
            gardener.gardenerId,

          uid:
            gardener.uid,

          name:
            gardener.name,

          email:
            gardener.email || "",

          phone:
            gardener.phone || "",
        };
      }

      const now =
        new Date().toISOString();

      const updated = {
        ...current,

        ...(body.status
          ? {
              status:
                body.status,
            }
          : {}),


        ...(body.status
          ? {
              category:
                getVisitCategory(
                  body.status
                ),
            }
          : {}),
        ...(body.visitDate !== undefined
          ? {
              visitDate:
                body.visitDate || null,
            }
          : {}),

        ...(body.visitTime !== undefined
          ? {
              visitTime:
                String(
                  body.visitTime ||
                    "Morning"
                ),
            }
          : {}),

        ...(body.gardenerId !== undefined
          ? {
              assignedGardener,
              assignmentType:
                "ADMIN",
              assignedAt:
                now,
              assignedBy:
                req.firebaseUser.uid,
            }
          : {}),

        updatedAt:
          now,
      };

      visits[index] =
        updated;

      writeVisits(
        visits
      );

      return res.json({
        success: true,
        message:
          "Visit updated successfully.",
        visit:
          updated,
      });
    } catch (error) {
      console.error(
        "Admin visit update failed:",
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

/* -------------------------
   GARDENER: ME
------------------------- */

app.get(
  "/api/v1/gardener/me",
  verifyGardener,
  (req, res) => {
    return res.json({
      success: true,
      gardener:
        req.gardener,
    });
  }
);

/* -------------------------
   GARDENER: MY VISITS
------------------------- */

app.get(
  "/api/v1/gardener/visits",
  verifyGardener,
  (req, res) => {
    try {
      const visits =
        readVisits()
          .filter(
            (visit) =>
              visit?.assignedGardener?.uid ===
              req.firebaseUser.uid
          )
          .sort((a, b) => {
            const aDate =
              a.visitDate
                ? new Date(
                    `${a.visitDate}T00:00:00`
                  ).getTime()
                : Number.MAX_SAFE_INTEGER;

            const bDate =
              b.visitDate
                ? new Date(
                    `${b.visitDate}T00:00:00`
                  ).getTime()
                : Number.MAX_SAFE_INTEGER;

            return aDate - bDate;
          });

      return res.json({
        success: true,
        count:
          visits.length,
        visits,
      });
    } catch (error) {
      console.error(
        "Gardener visits failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load gardener visits.",
      });
    }
  }
);

/* -------------------------
   GARDENER: START VISIT
------------------------- */

app.patch(
  "/api/v1/gardener/visits/:visitId/start",
  verifyGardener,
  (req, res) => {
    try {
      const visits =
        readVisits();

      const index =
        visits.findIndex(
          (item) =>
            item.visitId ===
              req.params.visitId &&
            item?.assignedGardener?.uid ===
              req.firebaseUser.uid
        );

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message:
            "Assigned visit not found.",
        });
      }

      const now =
        new Date().toISOString();

      visits[index] = {
        ...visits[index],

        status:
          "In Progress",

        category:
          getVisitCategory("In Progress"),

        startedAt:
          now,

        startedBy:
          req.firebaseUser.uid,

        updatedAt:
          now,
      };

      writeVisits(
        visits
      );

      return res.json({
        success: true,
        message:
          "Visit started successfully.",
        visit:
          visits[index],
      });
    } catch (error) {
      console.error(
        "Gardener start visit failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to start visit.",
      });
    }
  }
);

/* -------------------------
   GARDENER: COMPLETE VISIT
------------------------- */

app.patch(
  "/api/v1/gardener/visits/:visitId/complete",
  verifyGardener,
  (req, res) => {
    try {
      const visits =
        readVisits();

      const index =
        visits.findIndex(
          (item) =>
            item.visitId ===
              req.params.visitId &&
            item?.assignedGardener?.uid ===
              req.firebaseUser.uid
        );

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message:
            "Assigned visit not found.",
        });
      }

      const body =
        req.body || {};

      const now =
        new Date().toISOString();

      visits[index] = {
        ...visits[index],

        status:
          "Completed",

        category:
          getVisitCategory("Completed"),

        completedAt:
          now,

        completedBy:
          req.firebaseUser.uid,

        workVerification:
          body.workVerification ||
          body.completedWork ||
          visits[index]
            .workVerification ||
          [],

        gardenerNotes:
          String(
            body.gardenerNotes ||
              ""
          ).trim(),

        completionPhoto:
          typeof body.completionPhoto ===
          "string"
            ? body.completionPhoto
            : visits[index]
                .completionPhoto ||
              "",

        updatedAt:
          now,
      };

      writeVisits(
        visits
      );

      return res.json({
        success: true,
        message:
          "Visit completed successfully.",
        visit:
          visits[index],
      });
    } catch (error) {
      console.error(
        "Gardener complete visit failed:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to complete visit.",
      });
    }
  }
);

/* =========================================================
   RAZORPAY ORDER
========================================================= */

app.post(
  "/api/v1/razorpay/order",
  verifyFirebaseToken,
  async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({
          success: false,
          message: "Razorpay is not configured.",
        });
      }

      const {
        planName,
        months = 1,
      } = req.body || {};

      if (!planName || !PLAN_PRICES[planName]) {
        return res.status(400).json({
          success: false,
          message: "Invalid plan selected.",
        });
      }

      const parsedMonths = Number(months);

      if (
        !Number.isInteger(parsedMonths) ||
        parsedMonths < 1 ||
        parsedMonths > 24
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid subscription duration.",
        });
      }

      const customers = readJsonFile(customersFile);

      const customerIndex = customers.findIndex(
        (item) => item.uid === req.firebaseUser.uid
      );

      if (customerIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Customer account not found.",
        });
      }

      const customer = customers[customerIndex];

      const monthlyPrice = PLAN_PRICES[planName];
      const subtotal = monthlyPrice * parsedMonths;
      const gst = Math.round(subtotal * 0.18);
      const grandTotal = subtotal + gst;

      const amountInPaise = grandTotal * 100;
      const receipt = `MUNDER_${Date.now()}`;

      const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,

        notes: {
          uid: req.firebaseUser.uid,
          customer_id: customer.customerId || "",
          plan: planName,
          months: String(parsedMonths),
        },
      });

      return res.json({
        success: true,

        order: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          receipt: razorpayOrder.receipt,
        },

        pricing: {
          planName,
          monthlyPrice,
          months: parsedMonths,
          subtotal,
          gst,
          grandTotal,
        },

        keyId: process.env.RAZORPAY_KEY_ID,
      });

    } catch (error) {
      console.error(
        "Razorpay order creation failed:",
        error?.error || error
      );

      return res.status(500).json({
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
  verifyFirebaseToken,
  async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({
          success: false,
          message: "Razorpay is not configured.",
        });
      }

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body || {};

      if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {
        return res.status(400).json({
          success: false,
          message: "Incomplete payment verification data.",
        });
      }

      // Verify Razorpay signature
      const generatedSignature = crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

      const receivedBuffer = Buffer.from(
        razorpay_signature,
        "utf8"
      );

      const generatedBuffer = Buffer.from(
        generatedSignature,
        "utf8"
      );

      const isValid =
        receivedBuffer.length === generatedBuffer.length &&
        crypto.timingSafeEqual(
          receivedBuffer,
          generatedBuffer
        );

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Payment signature verification failed.",
        });
      }

      // Fetch the Razorpay order from Razorpay itself.
      // This prevents the frontend from changing plan/amount.
      const razorpayOrder =
        await razorpay.orders.fetch(
          razorpay_order_id
        );

      const orderNotes =
        razorpayOrder.notes || {};

      const uid = String(orderNotes.uid || "");

      if (!uid || uid !== req.firebaseUser.uid) {
        return res.status(403).json({
          success: false,
          message: "Payment customer verification failed.",
        });
      }

      const planName = String(orderNotes.plan || "");
      const months = Number(orderNotes.months || 1);

      if (!PLAN_PRICES[planName]) {
        return res.status(400).json({
          success: false,
          message: "Payment plan could not be verified.",
        });
      }

      if (
        !Number.isInteger(months) ||
        months < 1 ||
        months > 24
      ) {
        return res.status(400).json({
          success: false,
          message: "Payment subscription duration is invalid.",
        });
      }

      const monthlyPrice = PLAN_PRICES[planName];
      const expectedSubtotal = monthlyPrice * months;
      const expectedGst =
        Math.round(expectedSubtotal * 0.18);
      const expectedGrandTotal =
        expectedSubtotal + expectedGst;

      const expectedAmount =
        expectedGrandTotal * 100;

      if (
        Number(razorpayOrder.amount) !==
        expectedAmount
      ) {
        return res.status(400).json({
          success: false,
          message: "Payment amount verification failed.",
        });
      }

      // ---------------------------------------------------
      // Load customer
      // ---------------------------------------------------

      const customers =
        readJsonFile(customersFile);

      const customerIndex =
        customers.findIndex(
          (item) =>
            item.uid === req.firebaseUser.uid
        );

      if (customerIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Customer account not found.",
        });
      }

      const customer =
        customers[customerIndex];

      // ---------------------------------------------------
      // Prevent duplicate payment records
      // ---------------------------------------------------

      const payments =
        readJsonFile(paymentsFile);

      const alreadyRecorded =
        payments.find(
          (item) =>
            item.razorpayPaymentId ===
            razorpay_payment_id
        );

      if (alreadyRecorded) {
        return res.json({
          success: true,
          message: "Payment already verified.",
          payment: alreadyRecorded,
        });
      }

      // ---------------------------------------------------
      // Create subscription
      // ---------------------------------------------------

      const subscriptions =
        readJsonFile(subscriptionsFile);

      // Renewal logic:
      // If the customer's existing plan is still active,
      // extend from its current renewal date.
      // If it has expired or has no renewal date,
      // start the new period from today.

      const now = new Date();

      const existingRenewalDate =
        customer?.subscription?.renewalDate
          ? new Date(customer.subscription.renewalDate)
          : null;

      const hasFutureRenewal =
        existingRenewalDate &&
        !Number.isNaN(existingRenewalDate.getTime()) &&
        existingRenewalDate > now;

      const startDate =
        hasFutureRenewal
          ? existingRenewalDate
          : now;

      const endDate =
        addMonths(startDate, months);

      const subscription = {
        subscriptionId:
          createSubscriptionId(),

        uid: req.firebaseUser.uid,

        customerId:
          customer.customerId || null,

        planName,

        monthlyPrice,

        months,

        subtotal: expectedSubtotal,

        gst: expectedGst,

        grandTotal: expectedGrandTotal,

        status: "ACTIVE",

        startDate:
          startDate.toISOString(),

        renewalDate:
          endDate.toISOString(),

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      };

      subscriptions.unshift(subscription);

      writeJsonFile(
        subscriptionsFile,
        subscriptions
      );

      // ---------------------------------------------------
      // Payment record
      // ---------------------------------------------------

      const payment = {
        paymentRecordId:
          createPaymentRecordId(),

        uid: req.firebaseUser.uid,

        customerId:
          customer.customerId || null,

        planName,

        months,

        amount:
          expectedGrandTotal,

        currency: "INR",

        status: "PAID",

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,

        subscriptionId:
          subscription.subscriptionId,

        paidAt:
          new Date().toISOString(),
      };

      payments.unshift(payment);

      writeJsonFile(
        paymentsFile,
        payments
      );

      // ---------------------------------------------------
      // Activate customer
      // ---------------------------------------------------

      customers[customerIndex] = {
        ...customer,

        status: "ACTIVE",

        plan: {
          name: planName,

          monthlyPrice,

          months,

          startDate:
            subscription.startDate,

          renewalDate:
            subscription.renewalDate,

          subscriptionId:
            subscription.subscriptionId,
        },

        lastPayment: {
          amount:
            expectedGrandTotal,

          currency: "INR",

          status: "PAID",

          date:
            payment.paidAt,

          plan:
            planName,

          paymentId:
            razorpay_payment_id,
        },

        updatedAt:
          new Date().toISOString(),
      };

      writeJsonFile(
        customersFile,
        customers
      );

      // ---------------------------------------------------
      // Automatically schedule customer visit
      // ---------------------------------------------------

      const automaticVisit =
        createAutomaticCustomerVisit({
          customer: customers[customerIndex],
          subscription,
          isRenewal,
        });

      return res.json({
        success: true,

        message:
          "Payment verified and subscription activated.",

        payment,

        subscription,

        visit: automaticVisit,

        customer:
          customers[customerIndex],
      });

    } catch (error) {
      console.error(
        "Payment verification error:",
        error?.error || error
      );

      return res.status(500).json({
        success: false,
        message:
          error?.error?.description ||
          "Payment verification failed.",
      });
    }
  }
);

/* =========================================================
   CUSTOMER SUBSCRIPTION
========================================================= */

app.get(
  "/api/v1/customer/subscription",
  verifyFirebaseToken,
  (req, res) => {
    try {
      const subscriptions =
        readJsonFile(subscriptionsFile);

      const customerSubscriptions =
        subscriptions.filter(
          (item) =>
            item.uid === req.firebaseUser.uid
        );

      const activeSubscription =
        customerSubscriptions.find(
          (item) =>
            item.status === "ACTIVE"
        ) || null;

      return res.json({
        success: true,
        subscription:
          activeSubscription,
        subscriptions:
          customerSubscriptions,
      });

    } catch (error) {
      console.error(
        "Subscription lookup error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load subscription.",
      });
    }
  }
);

/* =========================================================
   CUSTOMER PAYMENT HISTORY
========================================================= */

app.get(
  "/api/v1/customer/payments",
  verifyFirebaseToken,
  (req, res) => {
    try {
      const payments =
        readJsonFile(paymentsFile);

      const customerPayments =
        payments.filter(
          (item) =>
            item.uid === req.firebaseUser.uid
        );

      return res.json({
        success: true,
        count: customerPayments.length,
        payments: customerPayments,
      });

    } catch (error) {
      console.error(
        "Payment history lookup error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load payment history.",
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

