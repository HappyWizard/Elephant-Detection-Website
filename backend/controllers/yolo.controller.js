import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from "url";

// Fix for ES module: Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runDetection = async (req, res) => {
  try {
    const videoFile = req.files.video;
    const uploadPath = path.join(__dirname, 'uploads', videoFile.name);

    // Save the uploaded video file
    await videoFile.mv(uploadPath);

    // Run YOLO detection (assuming you have a YOLO script)
    const scriptPath = path.join(__dirname, 'scripts', 'yolo_script.py');
    exec(`python3 ${scriptPath} --video ${uploadPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Detection failed" });
      }

      // Parse the output from YOLO (assuming it outputs JSON)
      const detectedObjects = JSON.parse(stdout);

      // Clean up the uploaded file
      fs.unlinkSync(uploadPath);

      // Send the detected objects back to the client
      res.json({ detectedObjects });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};