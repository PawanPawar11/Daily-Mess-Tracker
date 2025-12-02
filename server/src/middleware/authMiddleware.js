// sabse pehle check karna hai ki request ke headers me "authorization" hai ya nahi
// agar hai, to dekhna hai ki wo "Bearer" se start ho raha hai ya nahi (matlab Bearer token format me hai ya nahi)
// phir us string ko split karke actual token nikalna hai
// us token ko jwt.verify se verify karna hai → agar sahi hai to decoded object mil jayega
// decoded.id ke base pe user ko DB se nikalna hai, aur req.user me store karna hai
// agar koi bhi step fail ho jaye (token wrong hai / expire ho gaya / user nahi mila)
// to 401 Unauthorized ka response de dena hai
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  return res.status(401).json({ message: "No token, authorization denied!" });
};

export default auth;
