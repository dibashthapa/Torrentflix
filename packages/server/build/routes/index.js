import express from "express";
import login from "./access/login";
import video from "./media/video";
import register from "./access/register";
const router = express.Router();
router.use("/login", login);
router.use("/register", register);
router.use("/video", video);
export default router;
//# sourceMappingURL=index.js.map