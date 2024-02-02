import express from "express";

import {register, login} from '../controllers/auth.js'

const router = express.Router();
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
router.post("/register",   register)
router.post("/login",     login)

export default router