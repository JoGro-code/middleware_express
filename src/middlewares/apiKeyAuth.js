// src/middlewares/apiKeyAuth.js
import { config } from "dotenv";

// Laden der Umgebungsvariablen
config();

/**
 * Middleware zur Überprüfung des API-Keys.
 * Erwartet den API-Key im Header 'x-api-key'.
 * Sendet eine 401 Unauthorized Antwort, wenn kein gültiger API-Key bereitgestellt wurde.
 */
export const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
