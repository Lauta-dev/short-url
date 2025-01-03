import { login } from "@/controllers/login";
import { register } from "@/controllers/register";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export { router as user };
