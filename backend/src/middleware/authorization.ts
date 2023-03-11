import express, { Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { APP_SECRET } from '../config/index';
import { UserAttributes } from '../models/User';
import User from '../models/User';
import { apiError } from '../utils/apiError';


export const requireSignIn = (async (req:JwtPayload, res:Response, next:NextFunction) => {
    // 1) Get token from header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      return next(
        new apiError(
          "You are not login, Please login to get access this route",
          401
        )
      );
    }
  
    // 2) Verify token (no change happens, expired token)
    const decoded:any = jwt.verify(
      token,
      APP_SECRET,
      function (err:any, decoded:any) {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            next(new apiError(err.message, 403));
          }
        } else {
          return decoded;
        }
      }
    );
  
    if (decoded) {
      // 3) Check if user exists
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(
          new apiError(
            "The user that belong to this token does no longer exist",
            401
          )
        );
      }
  
      // 4) Save the user into req object
      req.user = user;
  
      next();
    }
  });
  
  // @Desc
  export const alowedTo =
    (...roles: any) =>
    (req:JwtPayload, res:Response, next:NextFunction) => {
      // 1) access roles
      // 2) access registered user (req.user.role)
  
      if (!roles.includes(req.user.role)) {
        return next(
          new apiError("You are not allowed to access this route", 403)
        );
      }
      next();
  };
  
  // @desc Make sure the user is logged in the same own url
//   exports.isAuth = (req, res, next) => {};
  