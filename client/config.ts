import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string(),
  NEXT_PUBLIC_CLIENT_URL: z.string(),
});

const configParser = envSchema.safeParse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
});

if (!configParser.success) {
  console.error(configParser.error.issues);
  throw new Error("The values ​​in the env file are invalid");
}

const configs = configParser.data;
export default configs;
