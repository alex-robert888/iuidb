import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, 'Full name is required']
  },
  userName: {
    type: String,
    trim: true,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Email address is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    trim: true,
    hide: true,
    required: [true, 'Password is required']
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;