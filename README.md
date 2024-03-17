# Express Middleware Application

This application provides a RESTful API using Express.js, leveraging an MSSQL database for storing user and price information. Authentication is managed through API keys, and the API is fully documented with Swagger.

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your system. Additionally, an MSSQL database is required to fully utilize the application.

## Installation

Clone the repository and install the dependencies with:

```bash
git clone https://example.com/middleware-express.git
cd middleware-express
npm install
```

## Configuration

Copy the .env.example file to .env and adjust the environment variables according to your database configuration:

```bash
DB_USER=YourDBUsername
DB_PASSWORD=YourDBPassword
DB_SERVER=YourDBServer
DB_DATABASE=YourDatabase
```

## Starting the Application

Start the server with:

```bash
npm start
```

The application runs on port 3000 by default, but this can be adjusted in the .env file.

## Adding New Routes

To add a new route, follow these steps:

### Create Controller: Start by creating a new controller in the src/controllers directory. For example, newFeatureController.js. Define your request handling logic here.

```JS
// src/controllers/newFeatureController.js
export const getNewFeature = (req, res) => {
res.json({ message: "Neues Feature" });
};
```

### Define Route: Create a new route in the src/routes directory. For example, newFeatureRoutes.js. Import your controller and define the route.

```JS
// src/routes/newFeatureRoutes.js
import express from 'express';
import { getNewFeature } from '../controllers/newFeatureController.js';

const router = express.Router();

router.get('/new-feature', getNewFeature);

export default router;
```

### Add Route to Application: Import the new route in your src/server.js and use it with app.use().

```JS
// extensions in src/server.js
import newFeatureRoutes from './routes/newFeatureRoutes.js';

app.use('/api', newFeatureRoutes);
```

## Database Connections

Database connections are managed in src/utils/db.js. To add a new connection or query, supplement the corresponding logic in this file. Note that database configuration is loaded from the environment variables.

## Defining JSON Responses

JSON responses are defined in the controllers. To define or adjust a JSON response, edit the corresponding function in the controller to send the desired response object.

## Swagger Documentation

The API documentation is provided with Swagger UI and is accessible at /api-docs. To expand or customize the documentation, edit the swagger.yaml in the src/docs directory.

## Advanced Configuration and Security

### API-Key Authentication

To enhance the security of your API, consider implementing API-key authentication. This can be achieved by creating a middleware that checks each request for the presence of a valid API key:

```JS
// src/middlewares/apiKeyAuth.js
export const apiKeyAuth = (req, res, next) => {
const apiKey = req.headers['x-api-key'];
if (!apiKey || apiKey !== process.env.API_KEY) {
return res.status(401).json({ message: "Unauthorized" });
}
next();
};
```

Add the middleware to your routes to ensure only requests with a valid API key are processed.

```JS
// example in src/server.js
import { apiKeyAuth } from './middlewares/apiKeyAuth.js';

app.use('/api/secure-route', apiKeyAuth, secureRoute);
```

Don't forget to define the API key in your .env file:

```bash
API_KEY=YourVerySecretAPIKey
```

### SSL/TLS Configuration

For production environments, it's crucial to use HTTPS to encrypt data transmission. Configure your Express server to use SSL/TLS certificates:

```JS
// SSL/TLS configuration in src/server.js
import https from 'https';
import fs from 'fs';

const sslServer = https.createServer({
key: fs.readFileSync(path.join(**dirname, 'cert', 'key.pem')),
cert: fs.readFileSync(path.join(**dirname, 'cert', 'cert.pem')),
}, app);

sslServer.listen(port, () => console.log(`Secure server on port ${port}`));
```

### Database Connection Resilience

Expand the database connection logic to implement resilience mechanisms, such as retry attempts.

### Expanding Swagger Documentation

The swagger.yaml file is central to documenting your API. To add new endpoints, parameters, or models, edit this file accordingly. For example, if adding a new model:

```bash
definitions:
NewModel:
type: object
properties:
id:
type: integer
name:
type: string
```

### Testing

Consider adding unit and integration tests to ensure the reliability of your application. Use frameworks like Jest or Mocha to test your logic and API endpoints.

```bash
npm install --save-dev jest
```

Add jest to package.json, to execute tests more easy:

```bash
"scripts": {
"test": "jest"
}
```
