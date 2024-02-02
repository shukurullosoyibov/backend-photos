import jwt from "jsonwebtoken";
import { createError } from "../utils/errors.js";
const secretKey = "s3cr3t-k3y";
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  console.log("tokenchaaaaaaaaaaaaaaaaaaaaaaaaa"+token);
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
export const verifyToken2 = (req, res, next) => {
  const tokenString  = req.header('Authorization');
  const token = tokenString.replace("Bearer ", "");
  console.log("tokenchaaaaaaaaaaaaaaaaaaaaaaaaa2"+token);
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not user authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  const {isAdmin} = req.body;
  console.log(isAdmin+"asdmini yoli sfsefsefnsfsefsef");
  verifyToken2(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not admin authorized!"));
    }
  });
};