import { Router } from "express";
import authRoutes from "./auth.routes";
// import userRouter from "./users.routes";

const router = Router();

router.use("/auth", authRoutes);

export default router;
