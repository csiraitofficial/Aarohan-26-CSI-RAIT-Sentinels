
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
import os
from protector import protect_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/protect")
async def protect(file: UploadFile = File(...)):
    input_bytes = await file.read()
    protected_bytes = protect_image(input_bytes)
    return Response(
        content=protected_bytes,
        media_type="image/png",
        headers={"Content-Disposition": "attachment; filename=protected.png"},
    )

# serve frontend on same port (built output so browser gets JS/CSS, not raw TSX)
FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
