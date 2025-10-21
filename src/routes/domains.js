import express from "express";
import {
  addDomain,
  checkDomainStatus,
} from "../controllers/domainController.js";

const router = express.Router();

router.post("/add", addDomain);
router.get("/check/:hostname", checkDomainStatus);

export default router;
