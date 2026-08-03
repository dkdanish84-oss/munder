import express from "express";
import auth from "../middleware/auth.js";
import {
  createVisit,
  myVisits,
} from "../controllers/visitController.js";

const router = express.Router();

router.post("/", auth, createVisit);
router.get("/my", auth, myVisits);

export default router;

