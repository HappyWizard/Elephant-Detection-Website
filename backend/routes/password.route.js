import express from 'express'
import { verifyEmail, verifyOTP } from '../controllers/password.controller.js';

const router = express.Router();

router.post('/verifyEmail', verifyEmail)

router.post('/verifyOTP', verifyOTP)

export default router;

