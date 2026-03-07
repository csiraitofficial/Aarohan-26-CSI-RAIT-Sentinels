
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil, os
from protector import protect_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR="uploads"
OUTPUT_DIR="outputs"

os.makedirs(UPLOAD_DIR,exist_ok=True)
os.makedirs(OUTPUT_DIR,exist_ok=True)

@app.get("/")
def root():
    return {"message":"Sentinel FastAPI backend running"}

@app.post("/protect")
async def protect(file: UploadFile = File(...)):
    input_path=os.path.join(UPLOAD_DIR,file.filename)
    with open(input_path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)

    output_path=protect_image(input_path)

    return FileResponse(output_path,media_type="image/png",filename="protected.png")
