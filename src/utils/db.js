import { config } from "dotenv";
import sql from "mssql";

// Laden der Umgebungsvariablen
config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // Sie können auch die IP-Adresse verwenden
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Für Azure SQL-Datenbank erforderlich
    trustServerCertificate: false, // Wahr, wenn Sie selbstsignierte Zertifikate verwenden
  },
};

export const connectToDatabase = async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Verbunden mit der Datenbank");
  } catch (err) {
    console.error("Datenbankverbindung fehlgeschlagen", err);
    throw err; // Wirf den Fehler weiter, damit der Serverstart abgebrochen werden kann
  }
};
