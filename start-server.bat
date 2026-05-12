@echo off
echo شغّل الموقع على http://localhost:8000
cd /d "%~dp0"
python -m http.server 8000
