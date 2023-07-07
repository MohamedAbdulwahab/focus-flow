import path from 'path';
import * as dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import todosRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';

/* .env file must be located in root folder */
dotenv.config();

/* use express */
const app = express();

/* use cors */
app.use(cors());
app.options('*', cors());

/* connect to Mongo database */
connectDB();

// Body Parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

/* Routes */
app.use('/api/todos', todosRoutes);
app.use('/api/users', userRoutes);

/* set the react build/dist folder for production */
if (process.env.NODE_ENV === 'production') {
  // set as static folder.
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // any route that is not an api route (shown above) will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}

const PORT = process.env.PORT || 5500;
app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
