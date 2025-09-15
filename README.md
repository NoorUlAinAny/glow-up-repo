# 🌟 Glow Up – AI-Powered Skin Analysis System  

## 📌 Introduction  
**Glow Up** is a Final Year Project (FYP) developed at **Punjab University, Lahore**.  
It is an **AI-powered web application** that helps users analyze their skin health using **deep learning, image processing, and real-time camera integration**.  

The system detects skin conditions such as **acne, redness, wrinkles, eye bags, and dark spots**, and provides **personalized skincare product recommendations** through the **Gemini API**.  
If the API is unavailable, a **fallback mechanism** ensures users still receive recommendations.  

---

## 🚀 Key Features  
- 📷 **Live Camera & Image Upload** – Capture skin images in real time or upload photos  
- 🧠 **AI Skin Detection** – CNN-based detection of acne, redness, wrinkles, eye bags, and dark spots  
- 📊 **Visualization & Reports** – Highlights affected areas, shows severity via charts, and generates reports  
- 💡 **Personalized Recommendations** – AI-powered skincare product suggestions using Gemini API + fallback  
- 📱 **Responsive Interface** – Built with React, optimized for all devices  

---

## 🛠 Technologies Used  

### 🔹 AI & Model Training  
- **Deep Learning:** TensorFlow, Keras  
- **Image Processing:** OpenCV  
- **Visualization:** Matplotlib, Seaborn, Radar Charts  

### 🔹 Web Application  
- **Frontend:** React.js, bootstrap, React Router  
- **Backend / APIs:** Python (Flask/Django), Gemini API  

### 🔹 Tools  
- GitHub (Version Control)  
- npm (Development)  
- Jupyter Notebooks (Model Training & Evaluation)  

---

## ⚙️ System Workflow  
1. **Image Capture/Upload** – User provides input via live camera or upload  
2. **Preprocessing** – Face detection, resizing (224×224), normalization  
3. **Model Prediction** – CNN identifies skin conditions  
4. **Visualization** – Highlighted areas + radar/severity charts  
5. **Recommendations** – Gemini API (or fallback) suggests skincare products  
 

---

## 📊 Model Development Summary  
- **Dataset:** Labeled skin images (acne, redness, wrinkles, eye bags, dark spots)  
- **Preprocessing:** Normalization, augmentation, resizing  
- **Architecture:** CNN with Conv2D, MaxPooling, Dropout, Dense layers  
- **Evaluation Metrics:** Accuracy, Precision, Recall, Confusion Matrix  
- **Output:** Severity visualization and recommendations  

---

## 📂 Project Structure  
GlowUp/
│── frontend/ # React frontend (UI, live camera, recommendations)
│ ├── src/
│ │ ├── components/
│ │ ├── layout/
│ │ ├── api/
│ │ └── assets/
│ └── package.json
│
│── backend/ # Flask/Django backend (AI model, APIs)
│ ├── model/ # Trained CNN models
│ ├── routes/
│ └── requirements.txt




## ⚡ Installation & Setup  

### 🔹 Frontend Setup  
```bash
cd frontend
npm install
npm run dev
Open at: http://localhost:5173

### 🔹 backend setup

cd backend
pip install -r requirements.txt
python app.py

Backend runs at: http://localhost:5000
