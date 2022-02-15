import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const express   = require("express");
const cors      = require("cors");
const morgan    = require("morgan");
const socketIo  = require("socket.io");
const http      = require("http");
import connect from "./database/connect";
import MongoUser from "./database/models/mongo-user";

// .env
require("dotenv").config();

// Connect to the database
connect();


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
const server = app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${ PORT }.`);
});

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket: any) => {
  console.log("New client connected");
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
  const designEventEmitter = MongoUser.watch()
  designEventEmitter.on('change', change => io.emit("dbChange", JSON.stringify("A change ocurred in the Users DB. Refresh the page to see them.")));
});