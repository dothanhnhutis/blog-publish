"use server";
import { User } from "@/schema/user";
import http from "./http";
import { cookies } from "next/headers";

export async function currentUser() {
  const cookie = cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  try {
    const { data } = await http.get<User>("/api/v1/users/me", {
      headers: {
        Cookie: cookie,
      },
    });
    return data;
  } catch (error: any) {
    console.log("UserService currentUser() method error: ", error);
  }
}
