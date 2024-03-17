import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import sql from "mssql";
import { dbConfig } from "../config/config.js";
import { apiKeyAuth } from "./middlewares/apiKeyAuth.js";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // Fehlender Import hinzugefügt

// __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Laden der Umgebungsvariablen
config();

const app = express();
const port = process.env.PORT || 3000;

let server; // Server-Variable für HTTP oder HTTPS
// Versuch, SSL-Zertifikate zu laden
try {
  const key = fs.readFileSync(path.join(__dirname, "cert", "key.pem"));
  const cert = fs.readFileSync(path.join(__dirname, "cert", "cert.pem"));

  server = https.createServer({ key, cert }, app);
  console.log(`Sicherer Server läuft auf Port ${port}`);
} catch (error) {
  console.warn("SSL-Zertifikat nicht gefunden. Starte den Server ohne SSL.");
  server = http.createServer(app); // Erstelle HTTP-Server falls kein SSL vorhanden; nur für DEV.
}

// Swagger-Dokumentation laden
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

app.use(express.json());
app.use("/api/users", apiKeyAuth, userRoutes);
app.use("/api/prices", apiKeyAuth, priceRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

const connectToDatabase = async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Datenbankverbindung erfolgreich hergestellt.");
  } catch (error) {
    console.error("Datenbankverbindung fehlgeschlagen:", error);
    setTimeout(connectToDatabase, 180000); // Versuche, die Verbindung alle 3 Minuten wiederherzustellen
  }
};

// Versuche, beim Start der Anwendung eine Datenbankverbindung herzustellen
connectToDatabase();

// Starte den Server, abhängig davon, ob ein HTTPS- oder HTTP-Server erstellt wurde
server.listen(port, () => console.log(`Server läuft auf Port ${port}`));
