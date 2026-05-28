import express from 'express'
import crypto, { getRandomValues } from "crypto"
import { timingSafeEqual } from "crypto";


const PORT = 4000;
const app = express()

app.use(express.json());



// generating hmac signature for webhook
const secret = "super_secret_key" //keep it hidden



app.get("/", (req, res) => {
    res.send('webhhook is running')
})

app.post("/webhook", (req, res) => {
    try {

        const sign = req.headers["x-signature"];

        if(!sign) {
            return res.status(401).json({
                message: "No signature is present"
            })
        }

// const payload = {
//   data: "anything",
//   type: "Pull request",
// };

const payload = req.body;
const message = JSON.stringify(payload);

// create hmac object using sha256 algorithm
const hmac = crypto.createHmac("sha256", secret);

hmac.update(message); //update the hmac data with the payload or message data

const signature = hmac.digest("hex"); //generate teh digest output can be 'hex', 'base64', etc...)



// console.log("HMAC Signature:", signature);



// comparing the generated signature with the receieved sign -- using time safe equal
const receievedSign = Buffer.from(sign);
const generatedSign = Buffer.from(signature)



    const isMatch = crypto.timingSafeEqual(receievedSign, generatedSign)

    if(!isMatch) {
        return res.status(400).json({
            message: "Wrong Signature"
        })
    }





return res.status(200).json({
    messaage: payload
})


    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }

})





app.listen(PORT, () => {
    console.log(`Server is running on http:localhost:${PORT}`)
})