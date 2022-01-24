import { Request, Response, NextFunction } from 'express';
const express = require("express");
import User from '../models/user';
const router = express.Router();
import IUserAttributes from '../../../common/models/user';
import AuthenticationService from '../services/authentication-service';

router.post('/login', async (req: Request<IUserAttributes>, res: Response, next: NextFunction) => {
  try {
    const user = new User(req.body);
    const authenticationService = new AuthenticationService(user);
    const accessToken = await authenticationService.login();

    res.json({
      message: "User successfully logged in.",
      accessToken: accessToken
    });
  }
  catch(error) {
    next(error);
  }
})

router.post('/register', async (req: Request<IUserAttributes>, res: Response, next: NextFunction) => {
  try {
    const user = new User(req.body);
    const authenticationService = new AuthenticationService(user);
    
    await authenticationService.register();
    res.json({ 
      message: "User successfully registered."
    });
  } 
  catch(error) {
    next(error);
  }
})

module.exports=router;