import mongoose from 'mongoose';

// Create a separate connection to the `Elephant-Detection` database
const detectionDB = mongoose.connection.useDb('Elephant-Detection'); 

const detectionSchema = new mongoose.Schema({
    timestamp: {
        type: Date, // Use Date type for proper sorting and querying
        required: true
    },
    object_detected: {
        type: String, // e.g., "Elephant"
        required: false
    },
    object_detected_count: {
        type: Number, // Number of detected objects
        required: false
    },
    confidence_audio: {
        type: Number, // Confidence score for audio detection (0-1 or percentage)
        required: true
    },
    confidence_camera: {
        type: Number, // Confidence score for camera detection (0-1 or percentage)
        required: true
    },
    device_code: {
        type: String, // Unique identifier for the device
        required: true
    },
    sound_file: {
        type: mongoose.Schema.Types.ObjectId, // Reference to GridFS file
        ref: 'fs.files',
        required: false // Optional
    },
    image_file: {
        type: mongoose.Schema.Types.ObjectId, // Reference to GridFS file
        ref: 'fs.files',
        required: false // Optional
    },
    location: {
        latitude: {
            type: Number,
            required: false // Optional
        },
        longitude: {
            type: Number,
            required: false // Optional
        }
    },
    audio_detected: {
        type: Boolean, // True if detected via sound
        required: true
    },
    camera_detected: {
        type: Boolean, // True if detected via camera
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Collection name: "Detections"
const Detection = detectionDB.model('Detection Data', detectionSchema);

export default Detection;
