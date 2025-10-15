// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export interface AuthRequest extends Request {
//   user?: { id: string };
// }

// const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) {
//     res.status(401).json({ msg: "No token, authorization denied" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       id: string;
//     };
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ msg: "Token is not valid" });
//   }
// };

// export default auth;

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // attach user info to request
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;

