# PostDocs Project

This project is a backend documentation website developed as a university assignment. The goal of this project is to create a documentation platform for API endpoints, integrating Django with Angular. It supports CRUD operations on user posts and provides full documentation of the backend APIs.

## Table of Contents

- [PostDocs Project](#postdocs-project)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
- [Setup Instruction](#setup-instruction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Authors](#authors)

## Project Overview

This project uses Django as the backend framework and Angular as the frontend framework. The backend provides a RESTful API, which is documented and used by the frontend to perform CRUD operations on user posts.

## Setup Instruction

1. ### Backend

    1. Navigate to the `backend` directory:

        ```bash
        cd backend
        ```

    2. Create a virtual environment and activate it:

         - Windows

             ```bash
               python -m venv .venv
               source  .venv/Scripts/activate
             ```

         - Linux

             ```bash
             python -m venv .venv
             source .venv/bin/activate
             ```

    3. Install the required Python packages:

        ```bash
        pip install -r requirements.txt
        ```

    4. Run database migrations:

        ```bash
        python manage.py makemigrations
        python manage.py migrate
        ```

    5. Start the Django development server:

        ```bash
        python manage.py runserver
        ```

2. ### Frontend

    1. Navigate to the `frontend` directory:

        ```bash
        cd frontend
        ```

    2. Install the required Node.js packages:

          ```bash
          npm install
          ```

    3. Start the Angular development server:

        ```bash
        ng serve
        ```

    4. Open your browser and navigate to:

        ```bash
       http://localhost:4200
        ```

## Features

- **CRUD Operations**: Full CRUD functionality for managing user posts.
- **API Documentation**: Comprehensive documentation for each API endpoint.
- **Backend Integration**: Django REST framework handles all data operations and API requests.
- **Frontend UI**: Angular provides a responsive interface to interact with backend APIs.

## Project Structure

Below is an outline of the directory structure:

  ```bash
  PostDocs_project/
├── postDocs/
│   ├── manage.py
│   ├── postDocs/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── authentication/                  
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── tests.py
│   │   ├── authentication.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── posts/                  
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
├── frontend/
│   ├── .angular/              
│   ├── node_modules/        
│   ├── public/            
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
|   │   │   │   ├── services/
|   │   │   │   └── interceptors/
│   │   │   ├── features/
|   │   │   │   ├── auth/
|   │   │   │   └── pages/
│   │   │   ├── shared/
|   |   │   │   ├── components/
|   |   |   |   ├── guards/
|   |   │   │   └── validators/
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.spec.ts
│   │   │   ├── app.component.ts
│   │   │   └── app.module.ts
│   │   ├── assets/            
│   │   ├── environments/            
│   │   ├── index.html          
│   │   ├── main.ts            
│   │   └── styles.css         
└── README.md

  ```

## Technologies Used

- ### Backend Technologies
    
    - **Django**: Python web framework for developing scalable and robust web applications.
    - **Django REST Framework (DRF)**: For building RESTful APIs.
    - **SQLite**: Default database for development (can be replaced with PostgreSQL or MySQL).
    - **Django REST Framework JWT**: Provides JSON Web Token (JWT) authentication for secure API access.
    - **Django CORS Headers**: To handle Cross-Origin Resource Sharing (CORS) between Angular and Django.
    - **Social Authentication**: Enables login using third-party providers like Google, Facebook, or GitHub (django-rest-framework-social-oauth2).
    - **Environment Files**: Utilized to manage sensitive data and configuration settings with tools (dotenv).
    - **Postman**: For testing and verifying API endpoints.

- ### Frontend Technologies

  - **Angular**: TypeScript-based framework for building web applications
  - **Bootstrap**: For responsive and united design
  - **Font Awesome**: For visual assets
  - **Node.js**: For package management with npm
  - **Prism.js**: To highlight JS code and API responses for testing and documentation
  - **Angular Material**: Using the built-in components for the API's Documentataion
    **ScrollReveal.js**: A JavaScript library for adding scroll-based animations to enhance the front-end experience.

## Authors

- [Tobboki](https://github.com/Tobboki)
- [Eldalye4](https://github.com/Eldalye4)
