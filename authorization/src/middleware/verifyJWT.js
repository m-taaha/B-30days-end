import jwt from "jsonwebtoken"

export const authentication = (req, res, next) => {

      const token = req.headers.authorization;
      const secret = "mysecretkey";

      if (!token) {
        return res.status(401).json({
          message: "Not Authorized",
        });
      }
    
    try {
    const decoded = jwt.verify(token, secret);
      console.log("Token is valid!", decoded);


      req.user = decoded;

      next();

} catch (error) {
      return res.status(403).json({
        message: "Invalid token"
      });
}
}