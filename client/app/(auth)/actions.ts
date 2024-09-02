// "use server";
// import { cookieParser } from "@/lib/utils";
// import { SignInInput } from "@/schema/auth";
// // import authApi from "@/services/auth-service";
// import { cookies, headers } from "next/headers";

// export async function signIn(input: SignInInput) {
//   const ua = headers().get("x-userAgent");

//   const res = await authApi.signIn({
//     input,
//     options: {
//       headers: {
//         "User-Agent": ua || "",
//       },
//     },
//   });
//   //   if (res.success) {
//   //     cookies().delete("registered");
//   //     for (const cookie of res.headers.getSetCookie()) {
//   //       const parser = cookieParser(cookie);
//   //       if (parser) {
//   //         const { name, value, ...opt } = parser;
//   //         cookies().set(name, value, opt);
//   //       }
//   //     }
//   //   }
//   return res;
// }
