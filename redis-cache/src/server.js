import express from "express"
import client from "./redis.js";
import { users } from "./userData.js";



const app = express();
const PORT = 4000;






const user = async (req, res) => {
    const id = Number(req.params.id);

    try {
          const cachedUser = await client.get(`user:${id}`)

    if(cachedUser){
        const user = JSON.parse(cachedUser)

        console.log("Cache Hit")

       return res.status(200).json({
         message: "User found in cache memory",
         user,
       });
    } 



    console.log("Cache Miss");


    const user = users.find(u => u.id === id )


    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }


    // save user in redis -- as redis saves things in string so stringify. and when returning res make sure to parse it into object
    // await client.set(`user:${id}`, JSON.stringify(user))
    await client.setEx(`user:${id}`, 30, JSON.stringify(user))




    return res.status(200).json({
        message: "User found",
        user
    })
    }catch (error) {
           console.log(error);
        return res.status(500).json({
            message: "Server error"
        })
    }
}



app.get(`/user/:id`, user);



app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`)
})