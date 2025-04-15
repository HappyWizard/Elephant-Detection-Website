import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { WebSocketServer } from 'ws';
import userRoutes from './routes/user.route.js';
import detectionRoutes from './routes/detection.route.js';
import passwordRoutes from './routes/password.route.js';
import yoloRoutes from './routes/yolo.route.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { getGridFSBucket } from './utils/gridfs.js';  // Import the GridFS functions
import http from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fix for ES module: Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootdirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/detection", detectionRoutes);
app.use("/api/yolo", yoloRoutes);

// Serve static PDF reports
app.use("/reports", express.static(path.join(__dirname, "public/reports")));
app.use(express.static(path.join(__rootdirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__rootdirname, "frontend", "dist", "index.html"));
});
// In server.js
app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true
}));


let gridFSBucket; // Define globally

// Connect to MongoDB and initialize GridFS
connectDB().then(() => {
    const conn = mongoose.connection;

    conn.once("open", () => {
        console.log("MongoDB connection established.");

        // Ensure GridFSBucket is using the correct database
        const elephantDetectionDB = conn.client.db("Elephant-Detection");

        // Initialize GridFSBucket
        gridFSBucket = new mongoose.mongo.GridFSBucket(elephantDetectionDB, {
            bucketName: "uploads"
        });

        console.log("GridFS initialized successfully.");
    });

}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const server = http.createServer(app);

// ⬇ attach WebSocket to the same server
const wss = new WebSocketServer({ server });

// WebSocket Server
// const wss = new WebSocketServer({ port: 5001 });
// const wss = new WebSocketServer({ port: 5001, host: '0.0.0.0' });
const clients = new Set(); // Track all connected frontend clients

wss.on('connection', (ws) => {
    console.log('New WebSocket connection established.');

    // Add new frontend clients to the Set
    clients.add(ws);

    ws.on('close', () => {
        clients.delete(ws); // Remove disconnected clients
    });

    ws.on('message', async (message) => {
        try {
            const detectionData = JSON.parse(message);
            console.log('Received detection data from Pi:', detectionData);

            let imageFileId = null;

            // If image is present, store in GridFS
            if (detectionData.image_file) {
                try {
                    // Get the initialized GridFSBucket
                    const gridFSBucket = getGridFSBucket();  // This will throw if not initialized

                    const imageBuffer = Buffer.from(detectionData.image_file, 'base64');
                    const timestamp = new Date(detectionData.timestamp).getTime() || Date.now();
                    const filename = `detection_${timestamp}_${detectionData.device_code}.jpg`;

                    const uploadStream = gridFSBucket.openUploadStream(filename, {
                        contentType: 'image/jpeg',
                        metadata: {
                            deviceCode: detectionData.device_code,
                            detectedObject: detectionData.object_detected,
                            timestamp: new Date(detectionData.timestamp)
                        }
                    });

                    uploadStream.write(imageBuffer);
                    uploadStream.end();

                    await new Promise((resolve, reject) => {
                        uploadStream.on('finish', resolve);
                        uploadStream.on('error', reject);
                    });

                    imageFileId = uploadStream.id;
                    console.log(`Image stored in GridFS with ID: ${imageFileId}`);
                } catch (error) {
                    console.error('Error storing image in GridFS:', error);
                    // Optionally notify the client of the failure
                    ws.send(JSON.stringify({
                        status: 'error',
                        message: 'Failed to store image',
                        error: error.message
                    }));
                }
            }

            // Save detection metadata in "detection data" collection
            const detectionDoc = {
                timestamp: new Date(detectionData.timestamp),
                object_detected: detectionData.object_detected,
                object_detected_count: detectionData.object_detected_count,
                confidence_audio: 0, // Default (no audio yet)
                confidence_camera: detectionData.confidence_camera,
                device_code: detectionData.device_code,
                sound_file: null, // No audio yet
                image_file: imageFileId, // GridFS file ID or null
                location: detectionData.location,
                audio_detected: false, // No audio yet
                camera_detected: true
            };

            // Save to "detection data" collection
            const db = mongoose.connection.db;
            await db.collection('detection datas').insertOne(detectionDoc);
            
            // Broadcast to ALL connected frontend clients
            clients.forEach(client => {
                if (client.readyState === 1) {
                client.send(JSON.stringify(detectionDoc));
                }
            });

        } catch (error) {
            console.error('Error processing WebSocket message:', error);
            ws.send(JSON.stringify({
                status: 'error',
                message: 'Failed to save detection',
                error: error.message
            }));
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed.');
    });
});


// Start the server
server.listen(PORT, () => {
    console.log(`Server + Websocket started at http://localhost:${PORT}`);
});
// app.listen(PORT, () => {
//     console.log(`Server started at http://localhost:${PORT}`);
// });
