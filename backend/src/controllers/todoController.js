import { Todo } from "../models/todoModal.js";


// Controller to get all todos
export const getAllTodos = async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching todos', error });
    }
};

// Controller to create a new todo
export const createTodo = async (req, res) => {
    const { title, description, completed } = req.body;
    const todo = new Todo({
      title,
      description,
      completed: completed || false, 
    });
    try {
      const savedTodo = await todo.save();
      res.status(201).json({data:savedTodo,message:"todo created successfully"});
    } catch (error) {
      res.status(400).json({ message: 'Error creating todo', error });
    }
};

// Controller to update a todo by ID
export const updateTodo = async (req, res) => {
    const { title, description, completed } = req.body;
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,{ title, description, completed });
      console.log(updateTodo,'updatedtodo');
      
      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: 'Error updating todo', error });
    }
};

// Controller to delete a todo by ID
export const deleteTodo = async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting todo', error });
    }
};
  