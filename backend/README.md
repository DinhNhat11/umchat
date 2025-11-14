# Django Chat App Backend

This is the backend of a real-time chat application built with Django and Django REST Framework, designed for scalability, security, and smooth integration with a frontend client.

## Key Features

### Secure User Authentication
- JSON-based login API with CSRF protection.
- Custom user profiles with public IDs for safe reference.

### Advanced Chat Functionality
- Multi-participant chat rooms with dynamic participant management.
- Message history retrieval with efficient serialization.
- API endpoints optimized for frontend integration and real-time updates.
- Send and track friend requests via REST API.

### Robust  Design
- Combination of class-based APIViews and function-based views for full-stack compatibility.
- Extensible serializers and models for easy future feature integration.

## Installation & Setup

### Install dependencies

```bash
pip install -r requirements.txt
```

### Apply migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Create a superuser (optional)

```bash
python manage.py createsuperuser
```

### Run the development server

```bash
python manage.py runserver
```
