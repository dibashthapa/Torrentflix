import express from "express";
import login from "./access/login";
import register from "./access/register";
const router = express.Router();

router.use("/login", login);
router.use("/register", register);

export default router;
