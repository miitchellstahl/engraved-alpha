import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ messgage: "Unauthenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ messgage: "Unauthenticated" });
  }
};

export default verifyToken;
