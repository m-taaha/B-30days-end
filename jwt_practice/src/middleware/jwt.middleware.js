import jwt from "jsonwebtoken";

export const authenticationToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
