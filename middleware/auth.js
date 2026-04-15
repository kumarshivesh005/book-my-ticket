import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).send({ error: "No token provided" });
    }

    const token = header.split(" ")[1]; // Bearer TOKEN

    const decoded = jwt.verify(token, "secretkey");

    // attach user info to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
};

