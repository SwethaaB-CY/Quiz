
# Quiz Module Project Setup Guide (ZIP File Method)

This guide explains how to set up and run the **Quiz Module** project, including the **frontend, backend, and Python API**.

## 1. Download the Project

1. **Access the Repository:**  
   - Navigate to the GitHub repository: [Quiz Module](https://github.com/SwethaaB-CY/Quiz)

2. **Download the ZIP File:**  
   - Click on the **"Code"** button.  
   - Select **"Download ZIP"** and save the file to your system.

3. **Extract the ZIP File:**  
   - Locate the downloaded ZIP file.  
   - Right-click and choose **"Extract All..."** (Windows) or use a file extractor (macOS/Linux).  
   - Open the extracted folder.

## 2. Project Structure

After extracting, the project will have the following structure:

```
Quiz/
│-- quiz-f/        # Frontend (React/Next.js)
│-- backend/       # Backend (Node.js/Express)
│-- python-api/    # Python API (FastAPI/Uvicorn)
│-- README.md
│-- other files...
```

---

## 3. Running the Frontend

1. **Open a terminal or command prompt.**  
2. Navigate to the frontend folder:  
   ```bash
   cd quiz-f
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Start the frontend development server:  
   ```bash
   npm run dev
   ```
5. The frontend will run at:  
   ```
   http://localhost:3000/
   ```

---

## 4. Running the Backend

1. Open a new terminal window.  
2. Navigate to the backend folder:  
   ```bash
   cd backend
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Start the backend server:  
   ```bash
   npm run start
   ```
5. The backend should now be running.

---

## 5. Running the Python API

1. Open a new terminal window.  
2. Navigate to the Python API folder:  
   ```bash
   cd python-api
   ```
3. Check the Python version:  
   ```bash
   python --version
   ```
4. **Create a Virtual Environment (venv):**  
   ```bash
   python -m venv venv
   ```
5. **Activate the Virtual Environment:**  
   - On Windows:  
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:  
     ```bash
     source venv/bin/activate
     ```

6. **Upgrade pip and install dependencies:**  
   ```bash
   pip install --upgrade pip
   ```

7. **Check if Uvicorn is Installed:**  
   ```bash
   pip show uvicorn
   ```
   - If Uvicorn is not installed, install it:  
     ```bash
     pip install uvicorn
     ```

8. **Add `main.py` (from the GitHub repo) inside the `venv` folder.**  

9. **Run the Python API:**  
   ```bash
   cd python-api
   venv\Scripts\activate
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

10. The Python API will run on:  
    ```
    http://localhost:8000/
    ```

---

## 6. Testing the Full Setup

- **Frontend (React/Next.js) →** `http://localhost:3000/`  
- **Backend (Node.js/Express) →** Running on default backend port  
- **Python API (FastAPI) →** `http://localhost:8000/`  

### **Testing with Postman**  
- Open **Postman**.  
- Make API requests to test backend and Python API.  
- Use `http://localhost:8000/docs` to see FastAPI's interactive documentation.  

---

Now, your **frontend, backend, and Python API** should all be running successfully! 🚀🎉
