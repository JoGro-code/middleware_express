// /config/config.js
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true, // Für Entwicklungszwecke. In Produktionsumgebungen entsprechend anpassen.
  },
};

export const port = process.env.PORT || 3000;
