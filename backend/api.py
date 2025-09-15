from flask_cors import CORS # type: ignore
from flask import Flask, request # type: ignore
from werkzeug.utils import secure_filename # type: ignore

from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing import image # type: ignore
from tensorflow.keras.models import load_model # type: ignore

import os
import pickle
import numpy as np # type: ignore
import cv2 # type: ignore


app = Flask(__name__)
cors = CORS(app)

single_output_model =pickle.load(open("model_single_output.pkl","rb"))
multi_output_model = pickle.load(open("model_multi_output.pkl","rb"))

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def is_face_image(filepath):
    # Load the pre-trained Haar Cascade for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    
    # Read the image
    img = cv2.imread(filepath)
    if img is None:
        print("Error: Could not load image.")
        return False

    # Convert to grayscale (face detection works better in grayscale)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    
    # If faces found, it's a face image
    if len(faces) > 0:
        return True
    else:
        return False

@app.route('/analyze', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return "No image uploaded!"

    file = request.files['image']
    if file.filename == '':
        return "No selected file!"

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        if not is_face_image(filepath):
            return "No face detected in the uploaded image!"

        # Get model choice from dropdown
        model_choice = request.form.get("model")

        try:
            # Preprocess image (adjust target_size to your model’s input)
            img = image.load_img(filepath, target_size=(224, 224))  
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)  # add batch dimension
            img_array = img_array / 255.0  # normalize if your model expects it

            predictions = {}
            labels = ["acne", "blackhead", "dark_circle", "dark_spots", 
                          "dry_skin", "eye_bags", "oiliness", "redness", "wrinkle"]

            if model_choice == "single_output":
                result = single_output_model.predict(img_array)
                prediction_index = np.argmax(result, axis=1)[0]
                prediction_label = labels[prediction_index]
                predictions[prediction_label] = round(float(result[0][prediction_index]) * 100, 2)

            elif model_choice == "multi_output":
                result = multi_output_model.predict(img_array)
                # Suppose your multi-output model predicts 9 labels
                for i, label in enumerate(labels):
                    predictions[label] = round(float(result[0][i]) * 100, 2)

            else:
                return "Invalid model choice!"

        except Exception as e:
            return f"Prediction failed: {str(e)}"


        return predictions

if __name__ == "__main__":
    app.run(debug=True)
