import { Request, Response, NextFunction } from 'express';
const express   = require("express");
const cors      = require("cors");
const morgan    = require("morgan");
const dbConnect = require("./database/connect");

// .env
require("dotenv").config();

// Connect to the database
dbConnect();

// Initialize app and middlewares
const app = express()
app.use(cors());
app.use(morgan('combined'))
app.use(express.json());

// Delegate requests to routers
const authenticationRouter = require('./routers/authentication-router'); 
const designsRouter = require('./routers/designs-router');
app.use('/auth', authenticationRouter);
app.use('/designs', designsRouter);

// Handle errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("*** Error *** ", err.message)
  res.status(500).send(err.message)
})

// Start the server on localhost:5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${ PORT }.`);
});