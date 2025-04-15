import cv2
import json
from ultralytics import YOLO

# Load the YOLO model
model = YOLO("yolo12n.pt")

def detect_objects(video_path):
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    detected_objects = []

    # Process the video frame-by-frame
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Run YOLO inference on the frame
        results = model(frame)

        # Extract detected objects and their labels
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls)  # Class ID of the detected object
                label = model.names[class_id]  # Label corresponding to the class ID
                confidence = float(box.conf)  # Confidence score
                detected_objects.append({
                    "label": label,
                    "confidence": confidence,
                    "bbox": box.xyxy.tolist()  # Bounding box coordinates
                })

    # Release the video capture object
    cap.release()

    return detected_objects

if __name__ == "__main__":
    import argparse

    # Parse command-line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("--video", required=True, help="Path to the video file")
    args = parser.parse_args()

    # Run object detection on the video
    detected_objects = detect_objects(args.video)

    # Output the detected objects as JSON
    print(json.dumps(detected_objects))