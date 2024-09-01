import { signIn } from "@/controller/auth";
import express, { type Router } from "express";

const router: Router = express.Router();
function authRouter(): Router {
  router.post("/auth/signin", signIn);
  return router;
}

export default authRouter();
