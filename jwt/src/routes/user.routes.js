import {Router } from "express"
import { userProfile, userSignIn, userSignUp } from "../controllers/user.controller.js";
import { authenticationToken } from "../middleware/jwt.middleware.js";

const userRouter = Router();


userRouter.post("/sign-up", userSignUp );
userRouter.post("/sign-in", userSignIn );
userRouter.get("/profile",authenticationToken,  userProfile );


export default userRouter;