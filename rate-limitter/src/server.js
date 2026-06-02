import express from "express";
import client from "./redis.js";



const app = express();
const PORT = 4000;



const rateLimitter = async (req, res) => {
    const clientIp = req.ip;
    console.log(clientIp);

    const clientReq =  await client.incr(`rate_limit:${req.ip}`)
   console.log(clientReq);

   if(clientReq === 1){
    await client.expire(`rate_limit:${req.ip}`, 60);
   }

   if(clientReq >= 4) {
    return res.status(429).json({
        message: "too many request"
    })
   }



  console.log("hello rate limitter");
  return res.status(200).json({
    message: "Hello rate Limitter",
  });
};



app.get("/", rateLimitter )


app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
