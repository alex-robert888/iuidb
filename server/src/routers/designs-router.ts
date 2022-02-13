const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
import MongoDesign from '../database/models/mongo-design';


router.get('/', authenticateToken, async (req: any, res: any, next: any) => {
  try {
    const designs = await MongoDesign.find({ userId: req.user.id });
    res.json(designs);
  } catch(e) {
    next(e);
  }
})

router.post('/', authenticateToken, async (req: any, res: any, next: any) => {
  try {
    const design = new MongoDesign({...req.body, userId: req.user.id});
    await design.save();
    res.json({ message: "Design successfully created." })
  } catch(e) {
    next(e);
  }
})

router.put('/:id', authenticateToken, async (req: any, res: any, next: any) => {
  try {
    await MongoDesign.findOneAndUpdate({ userId: req.user.id, _id: req.params['id'] }, req.body);
    res.json({ message: "Design successfully updated." })
  } catch(e) {
    next(e);
  }
})

router.delete('/:id', authenticateToken, async (req: any, res: any, next: any) => {
  try {
    await MongoDesign.findOneAndDelete({ userId: req.user.id, _id: req.params['id'] });
    res.json({ message: "Design successfully deleted." })
  } catch(e) {
    next(e);
  }
})

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  if(authHeader == null) {
    next(new Error("Bearer authentication header is missing!"));
    return;
  }

  const token = authHeader!.split(' ')[1]
  if(token == null) {
    next(new Error("Authentication token is invalid!"));
    return;
  }
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if(err) {
      next(new Error("Authentication token is invalid!"))
      return;
    } 
    
    req.user = user;
    next();
  })
}

module.exports=router;