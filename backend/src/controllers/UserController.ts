import asyncHanlder from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from "../models/User";
import Post from '../models/Post';
import Comment from '../models/Comment'
import Category from '../models/Category';
import { apiError } from '../utils/apiError';
import multer from 'multer';


const handlers = require("./handlersFactory");
import {storage} from '../config/cloudinary'
import { JwtPayload } from 'jsonwebtoken';


const { selectFields } = require("express-validator/src/select-fields");
const upload = multer({ storage: storage });


  