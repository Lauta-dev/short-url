import { updateUrlState } from "@/controllers/updateUrlState";
import { authenticateJWT } from "@/middleware/authenticateJWT";
import express from "express";

export const router = express.Router();

router.put("/api/user/update", authenticateJWT, updateUrlState);
