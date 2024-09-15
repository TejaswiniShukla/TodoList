import { Router } from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todoController.js";
const router=Router();


router.get('/get-todo',getAllTodos)

router.post('/create-todo',createTodo)

router.post('/update-todo/:id',updateTodo)

router.delete('/delete-todo/:id',deleteTodo)

export default router;
