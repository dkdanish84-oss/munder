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
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn(
    "WARNING: Supabase credentials are not configured."
  );
}

const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseServiceRoleKey || "placeholder"
);

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
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
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

    const {
      data: gardener,
      error,
    } =
      await supabase
        .from("gardeners")
        .select("*")
        .eq(
          "uid",
          uid
        )
        .eq(
          "active",
          true
        )
        .maybeSingle();

    if (error) {
      throw new Error(
        error.message
      );
    }

    if (!gardener) {
      return res.status(403).json({
        success: false,
        message:
          "Gardener access required.",
      });
    }

    req.userRole = "gardener";

    req.gardener = {
      gardenerId:
        gardener.gardener_id,

      uid:
        gardener.uid,

      name:
        gardener.name,

      email:
        gardener.email || "",

      phone:
        gardener.phone || "",

      role:
        gardener.role || "gardener",

      active:
        gardener.active !== false,

      createdAt:
        gardener.created_at,

      updatedAt:
        gardener.updated_at,
    };

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

async function createAutomaticCustomerVisit({
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

  const {
    data: existingVisit,
    error: existingError,
  } = await supabase
    .from("visits")
    .select("*")
    .eq("uid", customer.uid)
    .eq(
      "subscription_id",
      subscription.subscriptionId
    )
    .maybeSingle();

  if (existingError) {
    throw new Error(
      existingError.message
    );
  }

  if (existingVisit) {
    return {
      visitId:
        existingVisit.visit_id,

      uid:
        existingVisit.uid,

      customerId:
        existingVisit.customer_id,

      subscriptionId:
        existingVisit.subscription_id,

      planName:
        existingVisit.plan_name,

      name:
        existingVisit.name,

      mobile:
        existingVisit.mobile,

      address:
        existingVisit.address,

      gardenType:
        existingVisit.garden_type,

      service:
        existingVisit.service,

      visitDate:
        existingVisit.visit_date,

      visitTime:
        existingVisit.visit_time,

      notes:
        existingVisit.notes,

      photo:
        existingVisit.photo,

      status:
        existingVisit.status,

      category:
        existingVisit.category,

      assignedGardener:
        existingVisit.assigned_gardener,

      assignmentType:
        existingVisit.assignment_type,

      isRenewal:
        existingVisit.is_renewal,

      schedulingWindowDays:
        existingVisit.scheduling_window_days,

      createdAt:
        existingVisit.created_at,

      updatedAt:
        existingVisit.updated_at,
    };
  }

  const now =
    new Date();

  const days =
    getAutomaticVisitDays(
      subscription.planName,
      isRenewal
    );

  const visitDate =
    new Date(now);

  visitDate.setDate(
    visitDate.getDate() +
      Number(days)
  );

  const visit = {
    visitId:
      createVisitId(),

    uid:
      customer.uid,

    customerId:
      customer.customerId ||
      null,

    subscriptionId:
      subscription.subscriptionId,

    planName:
      subscription.planName ||
      "",

    name:
      customer.name ||
      "",

    mobile:
      customer.phone ||
      "",

    address:
      customer.address ||
      "",

    gardenType:
      customer.gardenType ||
      "Small",

    service:
      "Garden Maintenance",

    visitDate:
      visitDate
        .toISOString()
        .slice(0, 10),

    visitTime:
      "Morning",

    notes:
      isRenewal
        ? "Automatically scheduled renewal visit."
        : "Automatically scheduled first plan visit.",

    photo:
      "",

    status:
      "Pending",

    category:
      getVisitCategory(
        "Pending"
      ),

    assignedGardener:
      null,

    assignmentType:
      "AUTO",

    isRenewal:
      isRenewal,

    schedulingWindowDays:
      days,

    createdAt:
      now.toISOString(),

    updatedAt:
      now.toISOString(),
  };

  const insertData = {
    visit_id:
      visit.visitId,

    uid:
      visit.uid,

    customer_id:
      visit.customerId,

    subscription_id:
      visit.subscriptionId,

    plan_name:
      visit.planName,

    name:
      visit.name,

    mobile:
      visit.mobile,

    address:
      visit.address,

    garden_type:
      visit.gardenType,

    service:
      visit.service,

    visit_date:
      visit.visitDate,

    visit_time:
      visit.visitTime,

    notes:
      visit.notes,

    photo:
      visit.photo,

    status:
      visit.status,

    category:
      visit.category,

    assigned_gardener:
      null,

    assignment_type:
      visit.assignmentType,

    is_renewal:
      visit.isRenewal,

    scheduling_window_days:
      visit.schedulingWindowDays,

    created_at:
      visit.createdAt,

    updated_at:
      visit.updatedAt,
  };

  const {
    data,
    error,
  } = await supabase
    .from("visits")
    .insert(
      insertData
    )
    .select()
    .single();

  if (error) {
    throw new Error(
      error.message
    );
  }

  console.log("");
  console.log(
    "======================================"
  );
  console.log(
    " AUTOMATIC CUSTOMER VISIT CREATED"
  );
  console.log(
    "======================================"
  );
  console.log(
    `Visit ID    : ${data.visit_id}`
  );
  console.log(
    `UID         : ${data.uid}`
  );
  console.log(
    `Customer ID : ${data.customer_id}`
  );
  console.log(
    `Subscription: ${data.subscription_id}`
  );
  console.log(
    `Plan        : ${data.plan_name}`
  );
  console.log(
    `Renewal     : ${data.is_renewal}`
  );
  console.log(
    `Visit Date  : ${data.visit_date}`
  );
  console.log(
    "======================================"
  );
  console.log("");

  return {
    visitId:
      data.visit_id,

    uid:
      data.uid,

    customerId:
      data.customer_id,

    subscriptionId:
      data.subscription_id,

    planName:
      data.plan_name,

    name:
      data.name,

    mobile:
      data.mobile,

    address:
      data.address,

    gardenType:
      data.garden_type,

    service:
      data.service,

    visitDate:
      data.visit_date,

    visitTime:
      data.visit_time,

    notes:
      data.notes,

    photo:
      data.photo,

    status:
      data.status,

    category:
      data.category,

    assignedGardener:
      data.assigned_gardener,

    assignmentType:
      data.assignment_type,

    isRenewal:
      data.is_renewal,

    schedulingWindowDays:
      data.scheduling_window_days,

    createdAt:
      data.created_at,

    updatedAt:
      data.updated_at,
  };
}

/* =========================================================
   CUSTOMER VISITS API
========================================================= */

app.get(
  "/api/v1/customer/visits",
  verifyFirebaseToken,
  async (req, res) => {

    try {

      const uid =
        req.firebaseUser?.uid;

      if (!uid) {
        return res.status(401).json({
          success: false,
          message:
            "Customer authentication required.",
        });
      }

      const {
        data,
        error,
      } = await supabase
        .from("visits")
        .select("*")
        .eq(
          "uid",
          uid
        )
        .order(
          "visit_date",
          {
            ascending: true,
          }
        );

      if (error) {
        throw new Error(
          error.message
        );
      }

      const visits =
        (data || []).map(
          (item) => ({
            visitId:
              item.visit_id,

            uid:
              item.uid,

            customerId:
              item.customer_id,

            subscriptionId:
              item.subscription_id,

            planName:
              item.plan_name,

            name:
              item.name,

            mobile:
              item.mobile,

            address:
              item.address,

            gardenType:
              item.garden_type,

            service:
              item.service,

            visitDate:
              item.visit_date,

            visitTime:
              item.visit_time,

            notes:
              item.notes,

            photo:
              item.photo,

            status:
              item.status,

            category:
              item.category,

            assignedGardener:
              item.assigned_gardener,

            assignmentType:
              item.assignment_type,

            isRenewal:
              item.is_renewal,

            schedulingWindowDays:
              item.scheduling_window_days,

            createdAt:
              item.created_at,

            updatedAt:
              item.updated_at,
          })
        );

      return res.json({
        success: true,
        count:
          visits.length,
        visits,
      });

    } catch (error) {

      console.error(
        "SUPABASE CUSTOMER VISITS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
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
  async (req, res) => {
    try {
      const uid = req.firebaseUser?.uid;

      if (!uid) {
        return res.status(401).json({
          success: false,
          message: "Customer authentication required.",
        });
      }

      const {
        data: customer,
        error,
      } = await supabase
        .from("customers")
        .select("*")
        .eq("uid", uid)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

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

      console.error(
        "SUPABASE CUSTOMER LOOKUP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to load customer account.",
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

app.post("/api/visit", async (req, res) => {
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

    const visitId = createVisitId();

    const visitData = {
      visit_id: visitId,
      name: cleanName,
      mobile: cleanMobile,
      address: cleanAddress,
      garden_type: String(gardenType || "Small"),
      service: String(
        service || "Garden Maintenance"
      ),
      visit_date: cleanDate || null,
      visit_time: String(
        visitTime || "Morning"
      ),
      notes: String(notes || "").trim(),
      photo:
        typeof photo === "string"
          ? photo
          : "",
      status: "Pending",
      category: getVisitCategory("Pending"),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("visits")
      .insert([visitData])
      .select()
      .single();

    if (error) {
      console.error(
        "SUPABASE VISIT INSERT ERROR:",
        error
      );

      throw new Error(
        error.message || "Unable to save visit."
      );
    }

    const visit = {
      visitId: data.visit_id,
      name: data.name,
      mobile: data.mobile,
      address: data.address,
      gardenType: data.garden_type,
      service: data.service,
      visitDate: data.visit_date,
      visitTime: data.visit_time,
      notes: data.notes,
      photo: data.photo,
      status: data.status,
      category: data.category,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    console.log("");
    console.log(
      "======================================"
    );
    console.log(
      " NEW VISIT SAVED TO SUPABASE"
    );
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
        error.message ||
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

app.get(
  "/api/admin/customers",
  verifyAdmin,
  async (req, res) => {

    try {

      const {
        data: customers,
        error,
      } = await supabase
        .from("customers")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {
        throw new Error(
          error.message
        );
      }

      const actualCustomers =
        (customers || [])
          .filter((customer) => {

            if (!customer) {
              return false;
            }

            const hasPlan =
              !!customer.plan;

            const hasSuccessfulPayment =
              customer.last_payment &&
              customer.last_payment.status ===
                "PAID";

            return (
              hasPlan ||
              hasSuccessfulPayment
            );
          })
          .map((customer) => ({
            ...customer,

            customerId:
              customer.customer_id,

            createdAt:
              customer.created_at,

            updatedAt:
              customer.updated_at,

            lastPayment:
              customer.last_payment,
          }));

      return res.json(
        actualCustomers
      );

    } catch (error) {

      console.error(
        "SUPABASE ADMIN CUSTOMERS API ERROR:",
        error
      );

      return res.status(500).json({
        message:
          error.message ||
          "Unable to load customers",
      });
    }
  }
);
/* =========================================================
   ADMIN LEADS API
   Visit/enquiry users who have not purchased a paid
   plan or service are shown as leads.
========================================================= */

app.get("/api/admin/leads", verifyAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("visits")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const leads = (data || []).map((item) => ({
      visitId: item.visit_id,
      name: item.name,
      mobile: item.mobile,
      address: item.address,
      gardenType: item.garden_type,
      service: item.service,
      visitDate: item.visit_date,
      visitTime: item.visit_time,
      notes: item.notes,
      photo: item.photo,
      status: item.status,
      category: item.category,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return res.json({
      success: true,
      count: leads.length,
      leads,
    });

  } catch (error) {

    console.error(
      "SUPABASE ADMIN LEADS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to load leads",
    });
  }
});
app.get("/api/visits", verifyAdmin, async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("visits")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const visits = (data || []).map((item) => ({
      visitId: item.visit_id,
      name: item.name,
      mobile: item.mobile,
      address: item.address,
      gardenType: item.garden_type,
      service: item.service,
      visitDate: item.visit_date,
      visitTime: item.visit_time,
      notes: item.notes,
      photo: item.photo,
      status: item.status,
      category: item.category,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return res.json({
      success: true,
      count: visits.length,
      visits,
    });

  } catch (error) {

    console.error(
      "SUPABASE VISIT LIST ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to load visit requests.",
    });
  }
});

/* =========================================================
   GET SINGLE VISIT
========================================================= */

app.get(
  "/api/visit/:visitId",
  async (req, res) => {

    try {

      const { data, error } = await supabase
        .from("visits")
        .select("*")
        .eq(
          "visit_id",
          req.params.visitId
        )
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message:
            "Visit request not found.",
        });
      }

      const visit = {
        visitId: data.visit_id,
        name: data.name,
        mobile: data.mobile,
        address: data.address,
        gardenType: data.garden_type,
        service: data.service,
        visitDate: data.visit_date,
        visitTime: data.visit_time,
        notes: data.notes,
        photo: data.photo,
        status: data.status,
        category: data.category,
        assignedGardener:
          data.assigned_gardener,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return res.json({
        success: true,
        visit,
      });

    } catch (error) {

      console.error(
        "SUPABASE SINGLE VISIT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to load visit request.",
      });
    }
  }
);/* =========================================================
   UPDATE VISIT
========================================================= */

app.patch(
  "/api/visit/:visitId",
  async (req, res) => {

    try {

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

      const updateData = {
        updated_at:
          new Date().toISOString(),
      };

      if (status) {
        updateData.status = status;
        updateData.category =
          getVisitCategory(status);
      }

      if (
        req.body?.assignedGardener !==
        undefined
      ) {
        updateData.assigned_gardener =
          req.body.assignedGardener;
      }

      const { data, error } = await supabase
        .from("visits")
        .update(updateData)
        .eq(
          "visit_id",
          req.params.visitId
        )
        .select()
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message:
            "Visit request not found.",
        });
      }

      const visit = {
        visitId: data.visit_id,
        name: data.name,
        mobile: data.mobile,
        address: data.address,
        gardenType: data.garden_type,
        service: data.service,
        visitDate: data.visit_date,
        visitTime: data.visit_time,
        notes: data.notes,
        photo: data.photo,
        status: data.status,
        category: data.category,
        assignedGardener:
          data.assigned_gardener,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      return res.json({
        success: true,

        message:
          "Visit updated successfully.",

        visit,
      });

    } catch (error) {

      console.error(
        "SUPABASE VISIT UPDATE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to update visit.",
      });
    }
  }
);/* =========================================================
   ADMIN + GARDENER MANAGEMENT APIs
========================================================= */

/* -------------------------
   ADMIN: LIST GARDENERS
------------------------- */

app.get(
  "/api/v1/admin/gardeners",
  verifyAdmin,
  async (req, res) => {
    try {

      const { data, error } =
        await supabase
          .from("gardeners")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (error) {
        throw new Error(
          error.message
        );
      }

      const gardeners =
        (data || []).map(
          (item) => ({
            gardenerId:
              item.gardener_id,

            uid:
              item.uid,

            name:
              item.name,

            email:
              item.email || "",

            phone:
              item.phone || "",

            role:
              item.role || "gardener",

            active:
              item.active !== false,

            createdAt:
              item.created_at,

            updatedAt:
              item.updated_at,
          })
        );

      return res.json({
        success: true,
        count:
          gardeners.length,
        gardeners,
      });

    } catch (error) {

      console.error(
        "SUPABASE ADMIN GARDENER LIST ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
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
  async (req, res) => {
    try {

      const {
        uid,
        name,
        email = "",
        phone = "",
      } = req.body || {};

      const cleanUid =
        String(
          uid || ""
        ).trim();

      const cleanName =
        String(
          name || ""
        ).trim();

      if (
        !cleanUid ||
        !cleanName
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Gardener Firebase UID and name are required.",
        });
      }

      const {
        data: existing,
        error: existingError,
      } =
        await supabase
          .from("gardeners")
          .select("*")
          .eq(
            "uid",
            cleanUid
          )
          .maybeSingle();

      if (existingError) {
        throw new Error(
          existingError.message
        );
      }

      if (existing) {

        return res.status(409).json({
          success: false,
          message:
            "Gardener already exists.",

          gardener: {
            gardenerId:
              existing.gardener_id,

            uid:
              existing.uid,

            name:
              existing.name,

            email:
              existing.email || "",

            phone:
              existing.phone || "",

            role:
              existing.role || "gardener",

            active:
              existing.active,

            createdAt:
              existing.created_at,

            updatedAt:
              existing.updated_at,
          },
        });
      }

      const now =
        new Date()
          .toISOString();

      const gardener = {
        gardenerId:
          createGardenerId(),

        uid:
          cleanUid,

        name:
          cleanName,

        email:
          String(
            email || ""
          ).trim(),

        phone:
          String(
            phone || ""
          ).trim(),

        role:
          "gardener",

        active:
          true,

        createdAt:
          now,

        updatedAt:
          now,
      };

      const insertData = {
        gardener_id:
          gardener.gardenerId,

        uid:
          gardener.uid,

        name:
          gardener.name,

        email:
          gardener.email,

        phone:
          gardener.phone,

        role:
          gardener.role,

        active:
          gardener.active,

        created_at:
          gardener.createdAt,

        updated_at:
          gardener.updatedAt,
      };

      const {
        data,
        error,
      } =
        await supabase
          .from("gardeners")
          .insert(
            insertData
          )
          .select()
          .single();

      if (error) {
        throw new Error(
          error.message
        );
      }

      return res.status(201).json({
        success: true,
        message:
          "Gardener created successfully.",

        gardener: {
          gardenerId:
            data.gardener_id,

          uid:
            data.uid,

          name:
            data.name,

          email:
            data.email || "",

          phone:
            data.phone || "",

          role:
            data.role || "gardener",

          active:
            data.active,

          createdAt:
            data.created_at,

          updatedAt:
            data.updated_at,
        },
      });

    } catch (error) {

      console.error(
        "SUPABASE GARDENER CREATION ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
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
  async (req, res) => {
    try {

      const { data, error } = await supabase
        .from("visits")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw new Error(error.message);
      }

      const visits = (data || []).map((item) => ({
        visitId: item.visit_id,
        name: item.name,
        mobile: item.mobile,
        address: item.address,
        gardenType: item.garden_type,
        service: item.service,
        visitDate: item.visit_date,
        visitTime: item.visit_time,
        notes: item.notes,
        photo: item.photo,
        status: item.status,
        category: item.category,
        assignedGardener: item.assigned_gardener,
        assignmentType: item.assignment_type,
        assignedAt: item.assigned_at,
        assignedBy: item.assigned_by,
        startedAt: item.started_at,
        startedBy: item.started_by,
        completedAt: item.completed_at,
        completedBy: item.completed_by,
        workVerification: item.work_verification,
        gardenerNotes: item.gardener_notes,
        completionPhoto: item.completion_photo,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      return res.json({
        success: true,
        count: visits.length,
        visits,
      });

    } catch (error) {

      console.error(
        "SUPABASE ADMIN VISITS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
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
  async (req, res) => {
    try {

      const body = req.body || {};

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
        !allowedStatuses.includes(body.status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid visit status.",
        });
      }

      const { data: current, error: findError } =
        await supabase
          .from("visits")
          .select("*")
          .eq(
            "visit_id",
            req.params.visitId
          )
          .maybeSingle();

      if (findError) {
        throw new Error(findError.message);
      }

      if (!current) {
        return res.status(404).json({
          success: false,
          message: "Visit not found.",
        });
      }

      let assignedGardener =
        current.assigned_gardener;

      if (body.gardenerId !== undefined) {
        const {
          data: gardener,
          error: gardenerError,
        } =
          await supabase
            .from("gardeners")
            .select("*")
            .eq(
              "gardener_id",
              body.gardenerId
            )
            .eq(
              "active",
              true
            )
            .maybeSingle();

        if (gardenerError) {
          console.error(
            "Gardener lookup failed:",
            gardenerError
          );

          return res.status(500).json({
            success: false,
            message:
              "Failed to verify gardener.",
          });
        }

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

      const updateData = {
        updated_at: now,
      };

      if (body.status) {
        updateData.status =
          body.status;

        updateData.category =
          getVisitCategory(body.status);
      }

      if (
        body.visitDate !== undefined
      ) {
        updateData.visit_date =
          body.visitDate || null;
      }

      if (
        body.visitTime !== undefined
      ) {
        updateData.visit_time =
          String(
            body.visitTime ||
            "Morning"
          );
      }

      if (
        body.gardenerId !== undefined
      ) {
        updateData.assigned_gardener =
          assignedGardener;

        updateData.assignment_type =
          "ADMIN";

        updateData.assigned_at =
          now;

        updateData.assigned_by =
          req.firebaseUser.uid;
      }

      const { data, error } =
        await supabase
          .from("visits")
          .update(updateData)
          .eq(
            "visit_id",
            req.params.visitId
          )
          .select()
          .single();

      if (error) {
        throw new Error(error.message);
      }

      const visit = {
        visitId: data.visit_id,
        name: data.name,
        mobile: data.mobile,
        address: data.address,
        gardenType: data.garden_type,
        service: data.service,
        visitDate: data.visit_date,
        visitTime: data.visit_time,
        notes: data.notes,
        photo: data.photo,
        status: data.status,
        category: data.category,
        assignedGardener:
          data.assigned_gardener,
        assignmentType:
          data.assignment_type,
        assignedAt:
          data.assigned_at,
        assignedBy:
          data.assigned_by,
        startedAt:
          data.started_at,
        startedBy:
          data.started_by,
        completedAt:
          data.completed_at,
        completedBy:
          data.completed_by,
        workVerification:
          data.work_verification,
        gardenerNotes:
          data.gardener_notes,
        completionPhoto:
          data.completion_photo,
        createdAt:
          data.created_at,
        updatedAt:
          data.updated_at,
      };

      return res.json({
        success: true,
        message:
          "Visit updated successfully.",
        visit,
      });

    } catch (error) {

      console.error(
        "SUPABASE ADMIN VISIT UPDATE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
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
  async (req, res) => {
    try {

      const { data, error } = await supabase
        .from("visits")
        .select("*")
        .order("visit_date", {
          ascending: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      const visits = (data || [])
        .filter((item) => {
          const assigned =
            item.assigned_gardener;

          return (
            assigned &&
            assigned.uid ===
              req.firebaseUser.uid
          );
        })
        .map((item) => ({
          visitId: item.visit_id,
          name: item.name,
          mobile: item.mobile,
          address: item.address,
          gardenType: item.garden_type,
          service: item.service,
          visitDate: item.visit_date,
          visitTime: item.visit_time,
          notes: item.notes,
          photo: item.photo,
          status: item.status,
          category: item.category,
          assignedGardener:
            item.assigned_gardener,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));

      return res.json({
        success: true,
        count: visits.length,
        visits,
      });

    } catch (error) {

      console.error(
        "SUPABASE GARDENER VISITS ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
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
  async (req, res) => {

    try {

      const { data: visit, error: fetchError } =
        await supabase
          .from("visits")
          .select("*")
          .eq(
            "visit_id",
            req.params.visitId
          )
          .maybeSingle();

      if (fetchError) {
        throw new Error(
          fetchError.message
        );
      }

      if (!visit) {
        return res.status(404).json({
          success: false,
          message:
            "Assigned visit not found.",
        });
      }

      const assignedGardener =
        visit.assigned_gardener;

      if (
        !assignedGardener ||
        assignedGardener.uid !==
          req.firebaseUser.uid
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not assigned to this visit.",
        });
      }

      const now =
        new Date().toISOString();

      const updateData = {
        status:
          "In Progress",

        category:
          getVisitCategory(
            "In Progress"
          ),

        started_at:
          now,

        started_by:
          req.firebaseUser.uid,

        updated_at:
          now,
      };

      const { data, error } =
        await supabase
          .from("visits")
          .update(updateData)
          .eq(
            "visit_id",
            req.params.visitId
          )
          .select("*")
          .maybeSingle();

      if (error) {
        throw new Error(
          error.message
        );
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message:
            "Visit not found.",
        });
      }

      const updatedVisit = {
        visitId:
          data.visit_id,

        name:
          data.name,

        mobile:
          data.mobile,

        address:
          data.address,

        gardenType:
          data.garden_type,

        service:
          data.service,

        visitDate:
          data.visit_date,

        visitTime:
          data.visit_time,

        notes:
          data.notes,

        photo:
          data.photo,

        status:
          data.status,

        category:
          data.category,

        assignedGardener:
          data.assigned_gardener,

        assignmentType:
          data.assignment_type,

        assignedAt:
          data.assigned_at,

        assignedBy:
          data.assigned_by,

        startedAt:
          data.started_at,

        startedBy:
          data.started_by,

        completedAt:
          data.completed_at,

        completedBy:
          data.completed_by,

        workVerification:
          data.work_verification,

        gardenerNotes:
          data.gardener_notes,

        completionPhoto:
          data.completion_photo,

        createdAt:
          data.created_at,

        updatedAt:
          data.updated_at,
      };

      return res.json({
        success: true,

        message:
          "Visit started successfully.",

        visit:
          updatedVisit,
      });

    } catch (error) {

      console.error(
        "SUPABASE GARDENER START VISIT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
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
  async (req, res) => {

    try {

      const { data: visit, error: fetchError } =
        await supabase
          .from("visits")
          .select("*")
          .eq(
            "visit_id",
            req.params.visitId
          )
          .maybeSingle();

      if (fetchError) {
        throw new Error(
          fetchError.message
        );
      }

      if (!visit) {
        return res.status(404).json({
          success: false,
          message:
            "Assigned visit not found.",
        });
      }

      const assignedGardener =
        visit.assigned_gardener;

      if (
        !assignedGardener ||
        assignedGardener.uid !==
          req.firebaseUser.uid
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not assigned to this visit.",
        });
      }

      const body =
        req.body || {};

      const now =
        new Date().toISOString();

      const workVerification =
        body.workVerification ||
        body.completedWork ||
        visit.work_verification ||
        [];

      const gardenerNotes =
        body.gardenerNotes !==
        undefined
          ? String(
              body.gardenerNotes || ""
            ).trim()
          : (
              visit.gardener_notes ||
              ""
            );

      const completionPhoto =
        typeof body.completionPhoto ===
        "string"
          ? body.completionPhoto
          : (
              visit.completion_photo ||
              ""
            );

      const updateData = {
        status:
          "Completed",

        category:
          getVisitCategory(
            "Completed"
          ),

        completed_at:
          now,

        completed_by:
          req.firebaseUser.uid,

        work_verification:
          workVerification,

        gardener_notes:
          gardenerNotes,

        completion_photo:
          completionPhoto,

        updated_at:
          now,
      };

      const { data, error } =
        await supabase
          .from("visits")
          .update(updateData)
          .eq(
            "visit_id",
            req.params.visitId
          )
          .select("*")
          .maybeSingle();

      if (error) {
        throw new Error(
          error.message
        );
      }

      if (!data) {
        return res.status(404).json({
          success: false,
          message:
            "Visit not found.",
        });
      }

      const updatedVisit = {
        visitId:
          data.visit_id,

        name:
          data.name,

        mobile:
          data.mobile,

        address:
          data.address,

        gardenType:
          data.garden_type,

        service:
          data.service,

        visitDate:
          data.visit_date,

        visitTime:
          data.visit_time,

        notes:
          data.notes,

        photo:
          data.photo,

        status:
          data.status,

        category:
          data.category,

        assignedGardener:
          data.assigned_gardener,

        assignmentType:
          data.assignment_type,

        assignedAt:
          data.assigned_at,

        assignedBy:
          data.assigned_by,

        startedAt:
          data.started_at,

        startedBy:
          data.started_by,

        completedAt:
          data.completed_at,

        completedBy:
          data.completed_by,

        workVerification:
          data.work_verification,

        gardenerNotes:
          data.gardener_notes,

        completionPhoto:
          data.completion_photo,

        createdAt:
          data.created_at,

        updatedAt:
          data.updated_at,
      };

      return res.json({
        success: true,

        message:
          "Visit completed successfully.",

        visit:
          updatedVisit,
      });

    } catch (error) {

      console.error(
        "SUPABASE GARDENER COMPLETE VISIT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          error.message ||
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

      const {
        data: customer,
        error: customerError,
      } = await supabase
        .from("customers")
        .select("*")
        .eq(
          "uid",
          req.firebaseUser.uid
        )
        .maybeSingle();

      if (customerError) {
        throw new Error(
          customerError.message
        );
      }

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer account not found.",
        });
      }

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

      const {
        data: customer,
        error: customerError,
      } = await supabase
        .from("customers")
        .select("*")
        .eq(
          "uid",
          req.firebaseUser.uid
        )
        .maybeSingle();

      if (customerError) {
        throw new Error(
          customerError.message
        );
      }

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer account not found.",
        });
      }

      // ---------------------------------------------------
      // Prevent duplicate payment records
      // ---------------------------------------------------

      const {
        data: existingPayment,
        error: existingPaymentError,
      } = await supabase
        .from("payments")
        .select("*")
        .eq(
          "razorpay_payment_id",
          razorpay_payment_id
        )
        .maybeSingle();

      if (existingPaymentError) {
        throw new Error(
          existingPaymentError.message
        );
      }

      if (existingPayment) {
        return res.json({
          success: true,
          message: "Payment already verified.",

          payment: {
            paymentRecordId:
              existingPayment.payment_record_id,

            uid:
              existingPayment.uid,

            customerId:
              existingPayment.customer_id,

            planName:
              existingPayment.plan_name,

            months:
              existingPayment.months,

            amount:
              Number(existingPayment.amount),

            currency:
              existingPayment.currency,

            status:
              existingPayment.status,

            razorpayOrderId:
              existingPayment.razorpay_order_id,

            razorpayPaymentId:
              existingPayment.razorpay_payment_id,

            subscriptionId:
              existingPayment.subscription_id,

            paidAt:
              existingPayment.paid_at,
          },
        });
      }

      // ---------------------------------------------------
      // Create subscription
      // ---------------------------------------------------


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

      const {
        data: savedSubscription,
        error: subscriptionError,
      } = await supabase
        .from("subscriptions")
        .insert([
          {
            subscription_id:
              subscription.subscriptionId,

            uid:
              subscription.uid,

            customer_id:
              subscription.customerId,

            plan_name:
              subscription.planName,

            monthly_price:
              subscription.monthlyPrice,

            months:
              subscription.months,

            subtotal:
              subscription.subtotal,

            gst:
              subscription.gst,

            grand_total:
              subscription.grandTotal,

            status:
              subscription.status,

            start_date:
              subscription.startDate,

            renewal_date:
              subscription.renewalDate,

            razorpay_order_id:
              subscription.razorpayOrderId,

            razorpay_payment_id:
              subscription.razorpayPaymentId,

            created_at:
              subscription.createdAt,

            updated_at:
              subscription.updatedAt,
          },
        ])
        .select()
        .single();

      if (subscriptionError) {
        throw new Error(
          subscriptionError.message
        );
      }

      const subscriptionRecord = {
        subscriptionId:
          savedSubscription.subscription_id,

        uid:
          savedSubscription.uid,

        customerId:
          savedSubscription.customer_id,

        planName:
          savedSubscription.plan_name,

        monthlyPrice:
          Number(savedSubscription.monthly_price),

        months:
          savedSubscription.months,

        subtotal:
          Number(savedSubscription.subtotal),

        gst:
          Number(savedSubscription.gst),

        grandTotal:
          Number(savedSubscription.grand_total),

        status:
          savedSubscription.status,

        startDate:
          savedSubscription.start_date,

        renewalDate:
          savedSubscription.renewal_date,

        razorpayOrderId:
          savedSubscription.razorpay_order_id,

        razorpayPaymentId:
          savedSubscription.razorpay_payment_id,

        createdAt:
          savedSubscription.created_at,

        updatedAt:
          savedSubscription.updated_at,
      };

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
          subscriptionRecord.subscriptionId,

        paidAt:
          new Date().toISOString(),
      };

      const {
        data: savedPayment,
        error: paymentError,
      } = await supabase
        .from("payments")
        .insert([
          {
            payment_record_id:
              payment.paymentRecordId,

            uid:
              payment.uid,

            customer_id:
              payment.customerId,

            plan_name:
              payment.planName,

            months:
              payment.months,

            amount:
              payment.amount,

            currency:
              payment.currency,

            status:
              payment.status,

            razorpay_order_id:
              payment.razorpayOrderId,

            razorpay_payment_id:
              payment.razorpayPaymentId,

            subscription_id:
              payment.subscriptionId,

            paid_at:
              payment.paidAt,
          },
        ])
        .select()
        .single();

      if (paymentError) {
        throw new Error(
          paymentError.message
        );
      }

      const paymentRecord = {
        paymentRecordId:
          savedPayment.payment_record_id,

        uid:
          savedPayment.uid,

        customerId:
          savedPayment.customer_id,

        planName:
          savedPayment.plan_name,

        months:
          savedPayment.months,

        amount:
          Number(savedPayment.amount),

        currency:
          savedPayment.currency,

        status:
          savedPayment.status,

        razorpayOrderId:
          savedPayment.razorpay_order_id,

        razorpayPaymentId:
          savedPayment.razorpay_payment_id,

        subscriptionId:
          savedPayment.subscription_id,

        paidAt:
          savedPayment.paid_at,
      };

      // ---------------------------------------------------
      // Activate customer
      // ---------------------------------------------------

      const customerUpdatedAt =
        new Date().toISOString();

      const customerPlan = {
        name: planName,

        monthlyPrice,

        months,

        startDate:
          subscriptionRecord.startDate,

        renewalDate:
          subscriptionRecord.renewalDate,

        subscriptionId:
          subscriptionRecord.subscriptionId,
      };

      const customerLastPayment = {
        amount:
          expectedGrandTotal,

        currency: "INR",

        status: "PAID",

        date:
          paymentRecord.paidAt,

        plan:
          planName,

        paymentId:
          razorpay_payment_id,
      };

      const {
        data: updatedCustomer,
        error: customerUpdateError,
      } = await supabase
        .from("customers")
        .update({
          status: "ACTIVE",

          plan:
            customerPlan,

          last_payment:
            customerLastPayment,

          updated_at:
            customerUpdatedAt,
        })
        .eq(
          "uid",
          req.firebaseUser.uid
        )
        .select()
        .single();

      if (customerUpdateError) {
        throw new Error(
          customerUpdateError.message
        );
      }

      const customerRecord = {
        ...updatedCustomer,

        customerId:
          updatedCustomer.customer_id,

        createdAt:
          updatedCustomer.created_at,

        updatedAt:
          updatedCustomer.updated_at,

        lastPayment:
          updatedCustomer.last_payment,
      };

      // ---------------------------------------------------
      // Automatically schedule customer visit
      // ---------------------------------------------------

      const automaticVisit =
        await createAutomaticCustomerVisit({
          customer: customers[customerIndex],
          subscription,
          isRenewal,
        });

      return res.json({
        success: true,

        message:
          "Payment verified and subscription activated.",

        payment: paymentRecord,

        subscription: subscriptionRecord,

        visit: automaticVisit,

        customer:
          customerRecord,
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
  async (req, res) => {
    try {

      const uid = req.firebaseUser?.uid;

      if (!uid) {
        return res.status(401).json({
          success: false,
          message:
            "Customer authentication required.",
        });
      }

      const {
        data: customerPayments,
        error,
      } = await supabase
        .from("payments")
        .select("*")
        .eq("uid", uid)
        .order(
          "paid_at",
          {
            ascending: false,
          }
        );

      if (error) {
        throw new Error(error.message);
      }

      return res.json({
        success: true,
        count:
          (customerPayments || []).length,
        payments:
          customerPayments || [],
      });

    } catch (error) {

      console.error(
        "SUPABASE PAYMENT HISTORY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
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

