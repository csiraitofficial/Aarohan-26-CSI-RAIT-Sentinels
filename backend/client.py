import requests
import os
from PIL import Image

# Configuration
URL = "http://127.0.0.1:8000/protect"  # FastAPI endpoint
INPUT_PATH = "uploads/original_image.png"
OUTPUT_PATH = "uploads/protected_image.png"

def run_protection():
    # 1. Check file exists
    if not os.path.exists(INPUT_PATH):
        print(f"❌ Error: Could not find '{INPUT_PATH}'. Please check the folder.")
        return

    # Optional: Convert palette images to RGB before sending
    img = Image.open(INPUT_PATH).convert("RGB")
    img.save(INPUT_PATH)

    print(f"--- Starting Protection for: {INPUT_PATH} ---")
    
    try:
        # 2. Send image to FastAPI server
        with open(INPUT_PATH, "rb") as f:
            files = {"file": f}
            response = requests.post(URL, files=files)

        # 3. Save the protected image if server responded
        if response.status_code == 200:
            with open(OUTPUT_PATH, "wb") as f:
                f.write(response.content)
            print(f"✅ SUCCESS!")
            print(f"Protected image saved as: {OUTPUT_PATH}")
        else:
            print(f"❌ Server Error: {response.status_code}")
            print(f"Details: {response.text}")

    except Exception as e:
        print(f"❌ Connection Error: Is your main.py running?\nDetail: {e}")

if __name__ == "__main__":
    run_protection()