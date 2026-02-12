const requiredEnvVars = [
  "DATABASE_URL",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
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
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "",
  NODE_ENV: process.env.NODE_ENV || "production",
} as const;

export { validateRequiredEnvVars };
