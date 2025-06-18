import crypto from "crypto";

export type Hashing = {
  salt: string;
  hash: string;
}
// Fonction pour hasher un mot de passe
export function hashPassword(password: string): Hashing | unknown {
  try {
    if (!password) {
      throw new Error("Le mot de passe ne peut pas être vide ou null");
    }
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return { salt, hash };
  } catch (error) {
    console.log("erorr: " + error)
    return error;
  }
}

// Fonction pour vérifier le mot de passe
export function verifyPassword(
  password: string,
  hashedPassword: string,
  salt: string
) {
  try {
    if (!password) {
      throw new Error("Le mot de passe ne peut pas être vide ou null");
    }
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return hashedPassword === hash;
  } catch (error) {
    console.log("erorr: " + error)
    return error;
  }
}
