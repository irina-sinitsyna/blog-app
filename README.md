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

# Computational Question:

Please write a stored procedure that creates an amortization schedule (the Spitzer
Table) for a loan of 36000 and interest of 8% for 36 monthly payments.
After the 12th payment, you are required to change the loan’s setup - perform a loan
recycle on the remaining amount (according to the amortization schedule table) with
a fixed interest of 4.5% for an additional 48 payments.

```sql
DELIMITER //

CREATE PROCEDURE generate_amortization_schedule()
BEGIN
    DECLARE loan_amount DECIMAL(10, 2);
    DECLARE initial_interest_rate DECIMAL(5, 2);
    DECLARE second_interest_rate DECIMAL(5, 2);
    DECLARE initial_payments INT;
    DECLARE second_payments INT;
    DECLARE current_balance DECIMAL(10, 2);
    DECLARE payment_number INT DEFAULT 0;
    DECLARE payment_date DATE;
    DECLARE principal DECIMAL(10, 2);
    DECLARE interest DECIMAL(10, 2);

    -- Initialize loan details
    SET loan_amount = 36000.00;
    SET initial_interest_rate = 0.08; -- 8%
    SET second_interest_rate = 0.045; -- 4.5%
    SET initial_payments = 36;
    SET second_payments = 48;
    SET current_balance = loan_amount;

    -- Create a temporary table to store the amortization schedule
    CREATE TEMPORARY TABLE IF NOT EXISTS amortization_schedule (
        payment_number INT,
        payment_date DATE,
        principal DECIMAL(10, 2),
        interest DECIMAL(10, 2),
        remaining_balance DECIMAL(10, 2)
    );

    -- Loop through initial payments (first phase)
    WHILE payment_number < initial_payments DO
        SET payment_number = payment_number + 1;
        SET payment_date = DATE_ADD(CURDATE(), INTERVAL payment_number MONTH);
        SET interest = current_balance * initial_interest_rate / 12;
        SET principal = (loan_amount * initial_interest_rate / 12) / (1 - POW(1 + initial_interest_rate / 12, -initial_payments));
        SET current_balance = current_balance - principal;

        -- Insert into amortization schedule
        INSERT INTO amortization_schedule (payment_number, payment_date, principal, interest, remaining_balance)
        VALUES (payment_number, payment_date, principal, interest, current_balance);
    END WHILE;

    -- Loan recycle after the 12th payment
    IF payment_number = 12 THEN
        SET initial_payments = initial_payments - 12;
        SET current_balance = current_balance + (initial_payments * principal);
        SET initial_payments = initial_payments + second_payments;
    END IF;

    -- Loop through second payments (second phase)
    WHILE payment_number < initial_payments + second_payments DO
        SET payment_number = payment_number + 1;
        SET payment_date = DATE_ADD(CURDATE(), INTERVAL payment_number MONTH);
        SET interest = current_balance * second_interest_rate / 12;
        SET principal = (loan_amount * second_interest_rate / 12) / (1 - POW(1 + second_interest_rate / 12, -second_payments));
        SET current_balance = current_balance - principal;

        -- Insert into amortization schedule
        INSERT INTO amortization_schedule (payment_number, payment_date, principal, interest, remaining_balance)
        VALUES (payment_number, payment_date, principal, interest, current_balance);
    END WHILE;

    -- Return the amortization schedule
    SELECT * FROM amortization_schedule;

    -- Clean up
    DROP TEMPORARY TABLE IF EXISTS amortization_schedule;
END //

DELIMITER ;
```
