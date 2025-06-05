import express from 'express'
import multer from "multer";
import { getDetectionData, getAllDetectionData, getLocationDensity, saveDetectionData, getDetectionFiles } from '../controllers/detection.controller.js';

const router = express.Router();

// Use memory storage to handle file uploads before sending to GridFS
const upload = multer({ storage: multer.memoryStorage() });

// File upload route with Multer middleware
router.post("/send-detection-data", upload.fields([
    { name: "sound_file", maxCount: 1 },
    { name: "image_file", maxCount: 1 }
]), saveDetectionData);

// website display data by fetching from this API, directly from the database
router.get('/get-detection-data', getDetectionData)

router.get('/get-all-detection-data', getAllDetectionData)

router.get('/get-location-density-data', getLocationDensity)

router.get("/get-detection-files/:id", getDetectionFiles)
  
export default router;