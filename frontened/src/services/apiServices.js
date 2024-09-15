import { axiosInstance } from "./axiosInstance";

// Get all todos
export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get("/get-todo");
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
// Create a new todo
export const createTodo = async (todo) => {
  try {
    const response = await axiosInstance.post("/create-todo", todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update an existing todo
export const updateTodo = async (id, todo) => {
  console.log(id,todo);
  
  try {
    const response = await axiosInstance.post(`/update-todo/${id}`, todo);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const response =await axiosInstance.delete(`/delete-todo/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};