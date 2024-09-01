import dotenv from "dotenv";
import z from "zod";

dotenv.config({});

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  CLIENT_URL: z.string(),
});

const configParser = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
});

if (!configParser.success) {
  console.error(configParser.error.issues);
  throw new Error("The values in the env file are invalid");
}

const configs = configParser.data;
export default configs;
