import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Route, um alle Benutzer abzurufen
router.get("/", getAllUsers);

// Route, um einen Benutzer nach ID abzurufen
router.get("/:id", getUserById);

// Route, um einen neuen Benutzer zu erstellen
router.post("/", createUser);

// Route, um einen Benutzer zu aktualisieren
router.put("/:id", updateUser);

// Route, um einen Benutzer zu löschen
router.delete("/:id", deleteUser);

export default router;
