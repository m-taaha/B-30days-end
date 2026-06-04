import express from "express";
import { users } from "./userData.js";


const app = express();
const PORT = 4000;


const usersData = (req, res ) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit )|| 2;

  try {
    const filteredUsers = users.filter(user => {
      return user.name
      .toLowerCase()
      .includes(search.toLowerCase())
    })


    const skip = (page - 1) * limit;
    const pagedUsers = filteredUsers.slice(skip, skip+limit)


    return res.status(200).json({
      message: "users found",
      pagedUsers,
    })


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Server Error"
    })
  }

}



app.get("/users", usersData)

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
