import express from "express";
import { getLongUrl } from "@/controllers/getLongUrl";

const router = express.Router();

router.get("/api/:id", getLongUrl);

export { router as getLongUrl };
