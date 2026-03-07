
Sentinel FastAPI Integrated Project

Backend: FastAPI
Frontend: Existing React/Vite frontend (unchanged)

Run Backend:
cd backend
pip install fastapi uvicorn python-multipart opencv-python numpy
uvicorn fastapi_server:app --reload

Run Frontend:
cd frontend
npm install
npm run dev
