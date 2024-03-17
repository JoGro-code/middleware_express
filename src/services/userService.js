// src/services/userService.js
import * as userModel from "../models/userModel.js";

export const getAllUsers = async () => {
  try {
    const users = await userModel.findAllUsers();
    return users;
  } catch (error) {
    throw new Error("Fehler beim Abrufen aller Benutzer: " + error.message);
  }
};

export const getUserById = async (id) => {
  try {
    const user = await userModel.findUserById(id);
    if (!user) {
      throw new Error("Benutzer nicht gefunden");
    }
    return user;
  } catch (error) {
    throw new Error("Fehler beim Abrufen des Benutzers: " + error.message);
  }
};

export const createUser = async (userData) => {
  try {
    const newUser = await userModel.createUser(userData);
    return newUser;
  } catch (error) {
    throw new Error("Fehler beim Erstellen des Benutzers: " + error.message);
  }
};

export const updateUser = async (id, userData) => {
  try {
    const updatedUser = await userModel.updateUser(id, userData);
    return updatedUser;
  } catch (error) {
    throw new Error(
      "Fehler beim Aktualisieren des Benutzers: " + error.message
    );
  }
};

export const deleteUser = async (id) => {
  try {
    const deletionResult = await userModel.deleteUser(id);
    return deletionResult;
  } catch (error) {
    throw new Error("Fehler beim Löschen des Benutzers: " + error.message);
  }
};
