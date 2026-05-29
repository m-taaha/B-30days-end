import express from 'express'
import { fileUpload } from './controller/upload.controller.js';
import { upload } from "./middleware/multer.middleware.js";


const app = express();
const PORT = 4000;




app.post("/upload", upload.single("avatar"), fileUpload)


app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})








