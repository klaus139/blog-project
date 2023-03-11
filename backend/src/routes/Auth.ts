import express from 'express';
import {  registerUser, registerAdmin } from '../controllers/AuthController';
const router = express.Router();

router.post('/signup', registerUser)
router.post('/signup/admin', registerAdmin)
router.post('/login',)


export default router;