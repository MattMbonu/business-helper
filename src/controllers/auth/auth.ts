import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../../models/User/User";
import HttpError from "../../models/HttpError/HttpError";
import { hashPassword } from "./utils/auth-methods";

export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  let user: IUser | null;
  try {
    // Ensure no duplicates
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const hashedPassword = await hashPassword(password);

    user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    next(new HttpError("Server Error", 500));
  }
};
