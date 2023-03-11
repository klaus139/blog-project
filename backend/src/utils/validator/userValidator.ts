import express, {Request, Response, NextFunction} from 'express';
import { body, validationResult } from "express-validator";
import { validatorResult }from '../../middleware/validatorMiddleware'
import User from "../../models/User";
import { apiError } from "../apiError";
import { isValidObjectId } from "../valideMongoDBObject";
import bcrypt from "bcrypt";
import Jwt,{JwtPayload} from 'jsonwebtoken'

export const signupValidator = [
    body("name")
      .notEmpty()
      .withMessage("firstname is not allowed to be empty")
      .isLength({ max: 10 })
      .withMessage(
        "firstname length must be less than or equal to 10 characters long"
      )
      .isLength({ min: 4 })
      .withMessage("firstname length must be at least 3 characters long"),
    
    body("email")
      .notEmpty()
      .withMessage("email is not allowed to be empty")
      .isLength({ max: 40 })
      .withMessage(
        "email length must be less than or equal to 40 characters long"
      )
      .isEmail()
      .withMessage("Email must be a valid email")
      .custom(async (email, { req }) => {
        // Check if Email Exist
        const user = await User.findOne({ email: email });
  
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      }),
    body("password")
      .notEmpty()
      .withMessage("password is not allowed to be empty")
      .isLength({ min: 5 })
      .withMessage("password length must be at least 5 characters long"),
    validatorResult,
  ];
  
  export const loginValidator = [
    body("email")
      .notEmpty()
      .withMessage("Email is not allowed to be empty")
      .isEmail()
      .withMessage("Email must be a valid email"),
  
    body("password")
      .notEmpty()
      .withMessage("password is not allowed to be empty"),
    validatorResult,
  ];
  

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("firstname is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "firstname length must be less than or equal to 40 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("firstname length must be at least 3 characters long"),
  
  body("email")
    .notEmpty()
    .withMessage("email is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "email length must be less than or equal to 40 characters long"
    )
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email:any, { req:Request }) => {
      // Check if The Email Exist
      const user = await User.findOne({ email: email });

      if (user) {
        throw new Error("User Already Exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty")
    .isLength({ min: 5 })
    .withMessage("password length must be at least 5 characters long"),
  body("role")
    .optional()
    .custom((role, { req }) => {
      const roles = ["user", "admin"];

      if (!roles.includes(role)) {
        throw new Error(
          `User validation failed: role: ${role} is not a valid enum value for path`
        );
      }

      return true;
    }),

  validatorResult,
];

export const updateUserValidator = [
  // body("id").isMongoId().withMessage("Invalid user id format"),
  body("name")
    .notEmpty()
    .withMessage("firstname is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "firstname length must be less than or equal to 40 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("firstname length must be at least 3 characters long"),
  
  body("email")
    .notEmpty()
    .withMessage("email is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "email length must be less than or equal to 40 characters long"
    )
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email:any, { req:Request }) => {
      // Check if The Email Exist
      const user = await User.findOne({ email: email });

      if (user) {
        throw new Error("User Already Exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty")
    .isLength({ min: 5 })
    .withMessage("password length must be at least 5 characters long"),
  body("role")
    .optional()
    .custom((role, { req }) => {
      const roles = ["user", "admin"];

      if (!roles.includes(role)) {
        throw new Error(
          `User validation failed: role: ${role} is not a valid enum value for path`
        );
      }

      return true;
    }),

  validatorResult,
];

// export const deleteUserValidator = [
//   body("id").custom((value, { req:Request }) => {
//     if (!isValidObjectId(req.params.id)) {
//       throw new Error(`Invalid User id format`);
//     }
//     return true;
//   }),

//   validatorResult,
// ];

export const changeUserPasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("currentPassword is not allowed to be empty")
    .custom(async (value, { req }) => {
      const isValidPassword = await bcrypt.compare(value, req.user.password);

      if (!isValidPassword) {
        throw new Error("Incorrect current password");
      }
      // req.user.password === value
    }),
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty"),

  validatorResult,
];

// export const getUserValidator = [
//   body("id").custom((value, { req }) => {
//     if (!isValidObjectId(req.params.id)) {
//       throw new Error(`Invalid User id format`);
//     }
//     return true;
//   }),

//   validatorResult,
// ];

// export const getAllUserValidator = [
//   body("id").custom((value, { req }) => {
//     if (!isValidObjectId(req.params.id)) {
//       throw new Error(`Invalid User id format`);
//     }
//     return true;
//   }),

//   validatorResult,
// ];
