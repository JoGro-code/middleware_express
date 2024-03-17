// src/models/userModel.js
import sql from "mssql";
import { dbConfig } from "../../config/config.js";

export const findAllUsers = async () => {
  const pool = await sql.connect(dbConfig);
  const result = await pool
    .request()
    .query("SELECT id, name, email FROM Users");
  return result.recordset.map((user) => ({
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    additionalInfo: "Weitere Informationen", // Beispiel für ein weiteres Key-Value-Paar
  }));
};

export const findUserById = async (id) => {
  const pool = await sql.connect(dbConfig);
  const result = await pool
    .request()
    .input("userId", sql.Int, id)
    .query("SELECT id, name, email FROM Users WHERE id = @userId");
  if (result.recordset.length > 0) {
    const user = result.recordset[0];
    return {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      status: "Aktiv", // Beispiel für ein anpassbares Key-Value-Paar
    };
  }
  return null;
};

export const createUser = async (userData) => {
  const { name, email } = userData;
  const pool = await sql.connect(dbConfig);
  const result = await pool
    .request()
    .input("name", sql.NVarChar, name)
    .input("email", sql.NVarChar, email)
    .query(
      "INSERT INTO Users (name, email) OUTPUT INSERTED.id, INSERTED.name, INSERTED.email VALUES (@name, @email)"
    );

  return {
    userId: result.recordset[0].id,
    userName: result.recordset[0].name,
    userEmail: result.recordset[0].email,
    creationStatus: "Erfolgreich", // Beispiel für ein weiteres Key-Value-Paar
  };
};

export const updateUser = async (id, userData) => {
  const { name, email } = userData;
  const pool = await sql.connect(dbConfig);
  const result = await pool
    .request()
    .input("userId", sql.Int, id)
    .input("name", sql.NVarChar, name)
    .input("email", sql.NVarChar, email)
    .query(
      "UPDATE Users SET name = @name, email = @email WHERE id = @userId; SELECT id, name, email FROM Users WHERE id = @userId"
    );

  return {
    userId: result.recordset[0].id,
    updatedName: result.recordset[0].name,
    updatedEmail: result.recordset[0].email,
    updateStatus: "Erfolgreich", // Beispiel für ein weiteres Key-Value-Paar
  };
};

export const deleteUser = async (id) => {
  const pool = await sql.connect(dbConfig);
  await pool
    .request()
    .input("userId", sql.Int, id)
    .query("DELETE FROM Users WHERE id = @userId");

  return {
    userId: id,
    deletionStatus: "Erfolgreich", // Bestätigung des Löschvorgangs
  };
};
