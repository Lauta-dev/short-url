import express from "express";
import { saveUrlInDB } from "@/controllers/saveUrlInDB";

export const router = express.Router();

router.post("/api/url", saveUrlInDB);
