# E-Commerce for Gym

![image](https://github.com/Theverimix/E-Commerce/blob/main/E-commerce%20Frontend/public/img/github_preview.png?raw=true)

This project is an e-commerce application designed for gym equipment and services, featuring a backend built with Java (Spring Boot) and a frontend created with React. The project provides a user-friendly interface for customers and administrators, along with robust backend functionalities for data management and API handling. 💪🛒✨

![products screenshot](https://github.com/Theverimix/E-Commerce/blob/main/E-commerce%20Frontend/public/img/product_screenshot.png?raw=true)

![cart page screenshot](https://github.com/Theverimix/E-Commerce/blob/main/E-commerce%20Frontend/public/img/cart_screenshot.png?raw=true)

![checkout page screenshot](https://github.com/Theverimix/E-Commerce/blob/main/E-commerce%20Frontend/public/img/checkout_screenshot.png?raw=true)

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Backend Configuration](#backend-configuration)
5. [Running the Application](#running-the-application)
6. [Using Docker](#using-docker)

---

## Features

- User registration and login.
- Browse and purchase gym products and services.
- Admin panel for product and user management.
- Image upload and management using Cloudinary.

---

## Technologies Used

### Frontend

- React

### Backend

- Java
- Spring Boot
- Cloudinary API
- Database (customizable, e.g., MySQL or PostgreSQL) 💻📡🔒

---

## Getting Started

### Prerequisites

1. **Node.js and npm**:

   - Install Node.js ([https://nodejs.org/](https://nodejs.org/)).
   - npm is included with Node.js.

2. **Java JDK**:

   - Install Java Development Kit (JDK 11 or higher).

3. **Database**:

   - Set up a compatible database (e.g., MySQL or PostgreSQL).

4. **Cloudinary Account**:

   - Create a Cloudinary account and obtain your API key and URL. 🌐🔑⚙️

### Installation

#### Clone the repository:

```bash
git clone https://github.com/your-repo-link
cd your-project-folder
```

#### Install Frontend Dependencies:

```bash
cd frontend
npm install
```

#### Install Backend Dependencies:

```bash
cd backend
mvn install
```

---

## Backend Configuration

The backend requires a `secrets.properties` file for sensitive information. This file must be located in `src/main/resources`.

### Required Fields in `secrets.properties`:

```properties
DB_URL=
DB_USERNAME=
DB_PASSWORD=
CLOUDINARY_URL=
```

- **DB_URL**: The connection string to your database.
- **DB_USERNAME**: The username for your database.
- **DB_PASSWORD**: The password for your database.
- **CLOUDINARY_URL**: Your Cloudinary API URL.

---

## Running the Application

### Running the Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### Running the Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Start the React development server:
   ```bash
   npm start
   ```

## Using Docker

### Prerequisites

- Ensure Docker and Docker Compose are installed on your machine.

### Running with Docker Compose

1. Navigate to the project root folder
2. Run the following command to build and start the application:
   ```bash
   docker-compose up --build
   ```
3. Access the application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

4. Stop the application:
   ```bash
   docker-compose down
   ```

---

Thank you for checking out our project! Feel free to contribute or open issues to improve the platform.
