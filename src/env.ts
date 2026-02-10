const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET",
  "COOKIE_SECRET",
] as const;

const validateRequiredEnvVars = () => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

export default {
  HOSTNAME: process.env.HOSTNAME || "localhost",
  PORT: parseInt(process.env.PORT || "8000"),
  DATABASE_URL: process.env.DATABASE_URL || "",
  HASH_SALT_ROUNDS: parseInt(process.env.PASS_SALT_ROUNDS || "10"),
  JWT_SECRET: process.env.JWT_SECRET || "",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "",
  NODE_ENV: process.env.NODE_ENV || "production",
} as const;

export { validateRequiredEnvVars };
