const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"] as const;

const validateRequiredEnvVars = () => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

export const HOSTNAME = process.env.HOSTNAME || "localhost";
export const PORT = parseInt(process.env.PORT || "8000");
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const HASH_SALT_ROUNDS = parseInt(process.env.PASS_SALT_ROUNDS || "10");
export const JWT_SECRET = process.env.JWT_SECRET || "";

export { validateRequiredEnvVars };
