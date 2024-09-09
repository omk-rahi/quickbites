# QuickBites - Online Food Delivery Website

Quick Bites is an online food delivery website where users can place orders for delivery and track the status of their orders in real time.

## Table of Contents

- [Project Demo](#project-demo)
- [Technology Used](#technology-used)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)

## Project Demo

![Project demo image](https://github.com/omk-rahi/quickbites/blob/main/public/img/project-demo.png)
[Live Demo](https://quickbites-kj6z.onrender.com/) - Click here to view the live demo.

## Technology Used

- **Frontend**:

  - HTML5
  - CSS3
  - JavaScript

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB (for database)

- **Other Tools**:
  - JWT for user authentication
  - PUG for Templating

## Features

- User authentication and authorization
- Add to cart, order food for delivery/pickup

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/omk-rahi/quickbites.git
   cd quick-bites
   ```

2. Install the dependencies

   ```bash
   npm install
   ```

3. Set up MongoDB

   - Make sure you have MongoDB installed and running.
   - Create a new database named quickbites.

4. Set environment variables

   ```bash
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE_TIME=your_jwt_secret_key
   ```

5. Run the project

   ```bash
   npm start
   ```

Thank you!
