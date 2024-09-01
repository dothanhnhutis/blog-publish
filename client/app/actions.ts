"use server";
import { cookies } from "next/headers";
import userApi from "@/services/user-service";

export async function cookieServer() {
  return cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
}

export async function getCurrentUser() {
  const { success, data } = await userApi.currentUser(await cookieServer());
  return success ? data : undefined;
}
