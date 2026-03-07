@echo off
cd /d "%~dp0"
echo Starting server at http://127.0.0.1:8000 ...
uvicorn single_port_server:app --reload --port 8000 --host 127.0.0.1
pause
