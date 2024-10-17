## Introduction

API for Health Haven, your one-stop health center that aims to meet your nutritional needs and various health needs. We offer a wide range of medical services under one roof, where you can find doctors specialized in multiple fields to get the best healthcare.

## Authentication

The project implements authentication functionality to verify the identity of users. It includes features such as user registration, login, and logout. Authentication is implemented using techniques like password hashing and token-based authentication.

## Authorization

The licensing functionality allows the system to manage licenses for users or entities. It includes features such as license generation, validation, and expiration. The project may utilize license keys, digital signatures, or other mechanisms to enforce licensing rules.

## Security

The protection aspect focuses on securing the application and its resources. It involves implementing security measures such as user roles and permissions, access control, and data encryption. It aims to prevent unauthorized access, ensure data confidentiality, and protect against common security vulnerabilities.

### Explanation of Security Measures in the Code

The provided code snippet is a part of a web application written in JavaScript using the Express framework. The application includes several security measures to enhance the security and protection of the application. Here's an explanation of each measure:

### CORS (Cross-Origin Resource Sharing)

The code uses the "cors" library to implement Cross-Origin Resource Sharing (CORS). CORS allows other websites to make requests to this web application. The allowed origins are specified, and the server responds with the appropriate "Access-Control-Allow-Origin" header to indicate which origins are allowed to access the resources.

### Helmet

The "helmet" library is used to set secure HTTP headers. It helps protect the application from common web vulnerabilities such as Cross-Site Scripting (XSS), clickjacking, and MIME-sniffing attacks. Helmet automatically adds various security-related headers to the server's responses.

### Rate Limiting

The code utilizes the "express-rate-limit" library to implement rate limiting. It sets a maximum limit on the number of requests allowed from the same IP address within a specified time period. This prevents abuse and helps protect the server from DDoS attacks and brute-force attacks.

### Data Sanitization

To enhance security, the code uses the "express-mongo-sanitize" library for data sanitization. "express-mongo-sanitize" prevents NoSQL query injection by removing any characters that could alter the query's logic and structure. This helps protect the application from malicious queries and potential data breaches.

### XSS Protection

The "xss-clean" library is used for cross-site scripting (XSS) protection. It sanitizes user input by removing any malicious HTML tags and scripts. This prevents attackers from injecting harmful code into the application and protects users from potential XSS attacks.

### Parameter Pollution

The "hpp" library is employed to protect against parameter pollution attacks. It prevents parameter pollution by allowing only a specified set of parameters and rejecting duplicate parameters in the requests.

### Compression

The "compression" library is used to enable gzip compression of the server's responses. This reduces the size of the transferred data and improves the application's performance by reducing network latency.

## Error Handling

The project includes robust error handling mechanisms to gracefully handle and report errors. It implements error logging and provides informative error messages to aid in debugging and troubleshooting. The application may handle errors using try-catch blocks, error middleware, or error-handling frameworks.

## Database Seed

- create an admin user in the database

## Install

Some basic Git commands are:

1. **Clone the repository**:

   ```bash
   $ git clone https://github.com/MahamdSirafi/Holistic-Healing-Center
   $ cd Holistic-Healing-Center
   $ cd api
   ```

2. **Install dependencies**:
   ```bash
   $ npm install
   ```
3. **Set up environment variables**:
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Update the following variables in the `.env` file with your own values:
   ```env
   EMAIL_FROM=your_email
   EMAIL_API_KEY=your_api_key
   ```

## Start development

4. **Start the server**:

   ```
   $ npm start
   ```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

## API Endpoints

### user Endpoints

Please refer to the API documentation for more details on request and response formats.
swagger documentation is run on http://localhost:7000/docs

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- Passport.js: Authentication middleware for Node.js
- JSON Web Tokens (JWT): Token-based authentication mechanism
- MongoDB: NoSQL database for data storage

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify the code according to your specific project requirements.

## Contributors:

- Mohammed Adel Syrafi - Backend Developer
- Aya Battikh && Joud Kadoura - Frontend Developer
- Mohammed Adel Syrafi - Database Administrator

For any questions or inquiries, please contact our support team at maszzzzy@gmail.com.
