import z from "zod";
export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be string",
    })
    .email("Invalid email"),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be string",
  }),
  mfa_code: z
    .string({
      required_error: "mfa_code is required",
      invalid_type_error: "mfa_code must be string",
    })
    .optional(),
});
export type SignInInput = z.infer<typeof signInSchema>;
