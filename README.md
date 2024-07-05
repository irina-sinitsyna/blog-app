# Blog Platform Application

This repository contains a full-stack web application built with NestJS for the backend API and React with Vite for the frontend client.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Running with Docker](#running-with-docker)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Additional Notes](#additional-notes)

## Description

This application serves as a simple blog platform where users can create, read, update, and delete blog posts. It also allows users to comment on blog posts. Authentication is implemented using JWT tokens, ensuring secure access to create, update, and delete operations.

The frontend client is built with React using Vite as the bundler. It interacts with the backend API to fetch blog posts, display them, and manage user interactions such as commenting on posts.

## Features

- **Backend (NestJS):**

  - CRUD operations for blog posts
  - CRUD operations for comments
  - JWT-based authentication
  - PostgreSQL database with TypeORM
  - Automatic API documentation with Swagger/OpenAPI
  - Request/response logging middleware

- **Frontend (React with Vite):**
  - Login page with form validation
  - Blog posts page displaying posts and comments
  - Add/remove interface for comments
  - State management with React Query
  - Responsive design using Tailwind CSS

## Technologies Used

- **Backend:**

  - NestJS
  - TypeORM
  - PostgreSQL
  - JWT for authentication

- **Frontend:**
  - React
  - Vite
  - React Query
  - Tailwind CSS

## Setup Instructions

### Prerequisites

Before running the application, ensure you have the following installed:

- Docker
- Docker Compose

### Running with Docker

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-name>

   ```

2. **Create environment files:**

Create .env files in both the backend and frontend directories. Example contents:

backend/.env:

Copy code
DB_TYPE=postgres
DB_HOST=db
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=blog_db
JWT_SECRET=your_jwt_secret
frontend/.env:

REACT_APP_API_BASE_URL=http://backend:3000/api
Build and start containers:

3. **From the root directory of the repository, run:**

docker-compose up --build

This command will build Docker images for both backend and frontend, create containers, and start them.

4. **Access the application:**

Once containers are running, access the application at:

Backend API: http://localhost:3000/api
Frontend client: http://localhost

# Testing

Unit tests for backend API controllers are implemented using Jest. To run tests:

1. **Access the backend container:**

docker exec -it <backend-container-id> /bin/sh

2. **Run tests inside the container:**

npm test

# API Documentation

API documentation is automatically generated using Swagger. Access the documentation at:

http://localhost:3000/api/docs

# Deployment

For deployment, ensure you have Docker installed on your server. Use the provided Dockerfile configurations to build and run Docker images for both frontend and backend.

# Additional Notes

This application adheres to best practices in software development, including code readability, modularity, and scalability.
Continuous integration and deployment (CI/CD) pipelines can be set up to automate testing and deployment processes.
Improvements can be made in error handling, security measures, and performance optimizations based on specific deployment requirements.
