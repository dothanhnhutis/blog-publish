import { SignInInput } from "@/schema/auth";
import { FetchHttp, FetchHttpError, IError } from "./http";
import { User } from "@/schema/user";

class UserService extends FetchHttp {
  constructor() {
    super("/api/v1/users");
  }

  async currentUser(cookie: string) {
    try {
      return await this.get<User>("/me", {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService currentUser() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
}
export default new UserService();
