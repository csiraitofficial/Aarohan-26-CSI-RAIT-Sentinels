from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from protector import protect_image
import uvicorn

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI server is running. Use POST /protect to upload images."}

@app.post("/protect")
async def apply_protection(file: UploadFile = File(...)):
    """
    Accepts an image file, applies adversarial protection, and returns the protected image.
    """
    # 1. Read uploaded file
    original_data = await file.read()
    
    # 2. Apply adversarial protection
    protected_data = protect_image(original_data)
    
    # 3. Return the protected image as PNG
    return Response(content=protected_data, media_type="image/png")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)