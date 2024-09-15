import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload); 
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const existingTodo = state.items.find((todo) => todo._id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
      }
    },
    deleteTodos: (state, action) => {
      state.items = state.items.filter((todo) => todo._id !== action.payload);
    },
    setTodos: (state, action) => {
      state.items = action.payload; 
    },
  },
});

export const { addTodo, updateTodo, deleteTodos, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
