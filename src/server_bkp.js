import express from "express";
import { config } from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import userRoutes from "./routes/userRoutes.js";
import priceRoutes from "./routes/priceRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { connectToDatabase } from "./utils/db.js";

// Laden der Umgebungsvariablen
config();

const app = express();
const port = process.env.PORT || 3000;

// Swagger-Dokumentation laden
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

// Middleware zur Fehlerbehandlung
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/prices", priceRoutes);

// Swagger UI einbinden
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

// Datenbankverbindung herstellen
connectToDatabase()
  .then(() => {
    console.log("Datenbankverbindung erfolgreich hergestellt.");
    app.listen(port, () => {
      console.log(`Server läuft auf Port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Datenbankverbindung fehlgeschlagen:", error);
    process.exit(1);
  });
