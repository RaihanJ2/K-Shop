import { Router } from "express";
import {
  createAddress,
  getAddresses,
  setDefaultAddress,
} from "../controller/addressController";

const router = Router();

router.post("/setDefault", setDefaultAddress);
router.get("/", getAddresses);
router.post("/postAddress", createAddress);

export default router;
