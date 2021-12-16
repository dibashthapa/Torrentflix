import express, { Request, Response } from "express";

const router = express.Router();

router.post("/login", function (req: Request, res: Response) {
  const errors = [];
  const { email, password } = req.body;

  if (!email) {
    errors.push("email is required");
  }
  if (!password) {
    errors.push("password is required");
  }

  if (errors.length > 0) {
    return res.json(errors);
  }
});

router.post("/register", function (req: Request, res: Response) {
  const errors = [];
  const { email, password } = req.body;

  if (!email) {
    errors.push("email is required");
  }
  if (!password) {
    errors.push("password is required");
  }

  if (errors.length > 0) {
    return res.json(errors);
  }
});
export default router;
