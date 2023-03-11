import express from 'express';
import {  registerUser, registerAdmin, Login } from '../controllers/AuthController';
import { loginValidator, signupValidator } from '../utils/validator/userValidator';
const router = express.Router();

router.post('/signup', signupValidator, registerUser)
router.post('/signup/admin', signupValidator, registerAdmin)
router.post('/login', loginValidator, Login)


export default router;