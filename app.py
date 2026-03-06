from flask import Flask, request, jsonify, send_from_directory
import os
import cv2

from protection_engine import protect_image
from preprocessing import preprocess_image

app = Flask(__name__)

# Base directory (Sentinel-backend)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
PROTECTED_FOLDER = os.path.join(BASE_DIR, "protected")

# create folders if not exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROTECTED_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# Home route
@app.route("/")
def home():
    return jsonify({
        "message": "Sentinel Backend Running",
        "upload_endpoint": "/upload",
        "view_protected_image": "/protected/<filename>"
    })


# Upload Image API
@app.route("/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    filename = file.filename

    # Save original image
    upload_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(upload_path)

    # Preprocess image
    image = preprocess_image(upload_path)

    # Protect image
    protected_image = protect_image(image)

    # Save protected image
    protected_path = os.path.join(PROTECTED_FOLDER, filename)
    cv2.imwrite(protected_path, protected_image, [cv2.IMWRITE_JPEG_QUALITY, 100])

    return jsonify({
        "message": "Image protected successfully",
        "original_image": f"/uploads/{filename}",
        "protected_image": f"/protected/{filename}"
    })


# View Uploaded Image
@app.route("/uploads/<filename>")
def get_uploaded_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# View Protected Image
@app.route("/protected/<filename>")
def get_protected_image(filename):
    return send_from_directory(PROTECTED_FOLDER, filename)


# Run Server
if __name__ == "__main__":
    app.run(debug=True)
