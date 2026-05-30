import { Router } from "express";
import { getAdmin, getMe, signIn } from "../controllers/user.controller.js";
import {authentication} from "../middleware/verifyJWT.js";
import {authorization} from "../middleware/authorization.js";





const userRouter = Router();


userRouter.get("/sign-in", signIn);
userRouter.get("/profile",authentication, getMe)
userRouter.get("/admin",authentication, authorization, getAdmin)

export default userRouter;