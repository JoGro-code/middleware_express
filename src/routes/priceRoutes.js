import express from "express";
import { getPrice } from "../controllers/priceController.js";

const router = express.Router();

// Route, um Preisinformationen basierend auf Kunden-ID, Mandanten-ID und Artikelnummern abzurufen
router.get("/", getPrice);

export default router;
