import mongoose from "mongoose";

export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connected successfully`);
    } catch (error) {
        console.log(`Connection DB failed`)
        console.log(error.message)
        process.exit(1);
    }
}