import { deleteUrl } from "@/controllers/deleteUrl";
import { authenticateJWT } from "@/middleware/authenticateJWT";
import express from "express";

export const router = express.Router();

router.delete("/api/user/delete/", authenticateJWT, deleteUrl);
