import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import pkg from 'body-parser';
const { json: _json, urlencoded } = pkg;

// Imports
import { AppError } from './shared/middlewares/errorMiddleware.js';
import { testDatabaseConnection } from './database/db.js';
import routes from './shared/routes/index.js';

try {
  await testDatabaseConnection();
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

const app = express();

// Middlewares configuration
app.use(cors()); // TODO: DEFINIR O CORS POSTERIORMENTE
app.use(json());
app.use(_json());
app.use(
  urlencoded({
    extended: true
  })
);

// Middlewares processing
app.use(routes);

app.use(
  (err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',

      message: `Internal server error - ${err.message}`,
    });
  }
);

export default app;