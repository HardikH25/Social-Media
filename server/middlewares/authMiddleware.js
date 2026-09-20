import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const isAuthenticated = async (req, res, next) => { // a custom middleware
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not Authenticated" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        } 
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
}