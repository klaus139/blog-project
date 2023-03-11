import express, { Request, Response, NextFunction } from "express";
import User, { UserAttributes } from "../models/User";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  option,
  registerSchema,
  createToken
} from "../utils/validation";
import { apiError } from "../utils/apiError";
import { v4 as uuidV4 } from "uuid";
import { JwtPayload } from "jsonwebtoken";




export const registerUser = async (req: Request, res: Response) => {
  try{
    const { name, email, phone, password } = req.body;
    const uuiduser = uuidV4();

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const validateResult = registerSchema.validate(req.body);

  if (validateResult.error) {
    console.log(validateResult.error);
    return res.status(400).json({
      Error: validateResult.error.details[0].message,
    });
  }


  // Hash password
  const salt = await GenerateSalt()
  const userPassword = (await GeneratePassword(password, salt)) as string;

  // Create the user
  const user = await User.create({
    name,
    email,
    password: userPassword,
    phone,
    role: 'user',
    salt,
  });

  if (user) {
    res.status(201).json({ token: createToken(user._id), data: user });
  }

  

  
  } catch(err){
    console.log(err)
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
    try{
      const { name, email, phone, password } = req.body;
  
    if (!name || !email || !phone || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const validateResult = registerSchema.validate(req.body, option);
  
    if (validateResult.error) {
      console.log(validateResult.error);
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
  
    // Check if user exists
    // Hash password
  const salt = await GenerateSalt()
  const userPassword = (await GeneratePassword(password, salt)) as string;

  // Create the user
  const admin = await User.create({
    name,
    email,
    password: userPassword,
    phone,
    role: 'admin',
    salt,
  });

  if (admin) {
    res.status(201).json({message:'admin created', token: createToken(admin._id), data: admin });
  }

    } catch(err){
      console.log(err)
    }
  };


  
 