import { SignInInput } from "@/schema/auth";
import { FetchHttp, FetchHttpError, FetchHttpOption, IError } from "./http";

class AuthService extends FetchHttp {
  constructor() {
    super("/api/v1/auth");
  }

  async signIn({
    input,
    options,
  }: {
    input: SignInInput | Pick<SignInInput, "email">;
    options?: FetchHttpOption;
  }) {
    try {
      return await this.post<{ message: string }>("/signin", input, options);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService signUp() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
}
export default new AuthService();
