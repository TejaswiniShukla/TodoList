import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  completed: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
});

// Add a pre-save hook to update `updatedAt` before each save
todoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Todo = mongoose.model('Todo', todoSchema);
