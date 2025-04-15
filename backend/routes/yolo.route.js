import express from 'express'
import { runDetection } from '../controllers/yolo.controller.js';

const router = express.Router();

router.post('/detect', runDetection)


export default router;