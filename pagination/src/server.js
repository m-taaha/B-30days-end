import express from "express";
import {users} from "./userData.js"

const app = express();
const PORT = 4000;



const registeredUsers = (req , res) => {
  const page =  Number(req.query.page || 1);
  const limit = Number(req.query.limit) || 5;

console.log(page);
console.log(limit);

try {
  const skip = (page - 1 ) * limit;

  const onPageUsers = users.slice(skip, skip+limit )

  if(onPageUsers.length === 0) {
    return res.status(400).json({
      message: "no user available"
    })
  }

  return res.status(200).json({
    message: onPageUsers
  })


} catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "server error"
  })
}

}




app.get("/users", registeredUsers)



app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
