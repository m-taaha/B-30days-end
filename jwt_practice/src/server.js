import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", userRouter);



connectDB();
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})