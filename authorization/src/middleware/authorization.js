

export const authorization = (req, res, next) => {

    try {
        const user = req.user;

        if(user.role === "user") {
            return res.status(403).json({
                message: "Not authorized"
            })
            }

        if(user.role === "admin") 
            next();

    } catch (error) {
         return res.status(403).json({
           message: "Invalid token",
         });
    }
}