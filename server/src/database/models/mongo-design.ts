import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required']
  },
  url: {
    type: String,
    trim: true,
    required: [true, 'URL is required']
  },
});

const designModel = mongoose.model("design", designSchema);
export default designModel;