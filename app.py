from flask import Flask, request, jsonify
import os
import cv2
from protection_engine import protect_image
from preprocessing import preprocess_image

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
PROTECTED_FOLDER = "protected"

# create folders if not exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROTECTED_FOLDER, exist_ok=True)


@app.route("/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    upload_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(upload_path)

    # preprocessing
    image = preprocess_image(upload_path)

    # protection
    protected_image = protect_image(image)

    protected_path = os.path.join(PROTECTED_FOLDER, file.filename)

    # save protected image
    cv2.imwrite(protected_path, protected_image)

    return jsonify({
        "message": "Image protected successfully",
        "protected_image": protected_path
    })


if __name__ == "__main__":
    app.run(debug=True)
