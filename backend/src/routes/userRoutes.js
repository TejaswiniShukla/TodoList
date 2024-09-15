import { Router } from "express";
import { login, register } from "../controllers/userController.js";
const router=Router();
// const { register,login } = require("../controllers/indexController");



router.post("/register",register)

router.post("/login",login)




export default router