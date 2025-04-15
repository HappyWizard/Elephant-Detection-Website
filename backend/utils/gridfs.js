import mongoose from "mongoose";

let gridFSBucket = null;

// Function to initialize GridFSBucket
export const initializeGridFS = () => {
    if (!gridFSBucket && mongoose.connection.readyState === 1) {
        gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads"
        });
        console.log("GridFS initialized inside gridfs.js");
    }
};

// Function to get GridFSBucket
export const getGridFSBucket = () => {
    if (!gridFSBucket) {
        console.error("GridFSBucket is not initialized yet.");
        throw new Error("GridFSBucket is not initialized yet.");
    }
    return gridFSBucket;
};

// Call initializeGridFS once MongoDB is connected
mongoose.connection.once("open", () => {
    initializeGridFS();
});
