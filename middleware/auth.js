import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.token

    try {
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token.' });
            }
            req.user = user
            next()
        }
        )

    } catch (err) {
        console.log(err)
    }
};