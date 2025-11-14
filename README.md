# UMCHAT - Full Stack Real-Time Chat Application

## About the Project

This is a full-stack real-time chat application with a Django backend and a React frontend. The app features secure user authentication, multi-participant chat rooms, message history, and friend request management.

The backend is built with Django REST Framework, providing JSON APIs with CSRF protection, robust serializers, and flexible models for scalable chat functionality. The frontend uses React for a responsive, interactive chat interface that integrates seamlessly with the API.

## Running the Project

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Exploring the Code

- **Backend code** is in the `backend` folder, with APIViews, serializers, and models demonstrating professional Django patterns.
- **Frontend code** is in the `frontend` folder, bootstrapped with Create React App.
- Each folder contains its own README with detailed instructions for setup, running, and configuration.
- To understand the full architecture, start with the backend APIs, then see how the React frontend consumes them for real-time chat functionality.

## Project Highlights

This project showcases secure API design, scalable chat architecture, and professional full-stack development skills suitable for production-ready applications.
