import express from "express";
import userRouter from "./controllers/routes/user.routes.js";


const app = express();

const PORT =  3000;

app.use(express.json());
app.use("/user", userRouter);


app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
