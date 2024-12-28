import { deleteUrl } from "@/controllers/deleteUrl";
import express from "express";

export const router = express.Router();

// TODO: Proteger esta ruta
router.delete("/api/user/delete/:url_id", deleteUrl);
