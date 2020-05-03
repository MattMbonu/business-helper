import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../../models/User/User";
import { errorWrapper } from "../utils/helperMethods";
import HttpError from "../../models/HttpError/HttpError";
import { hashPassword, comparePassword } from "./utils/auth-methods";

export const signupUser = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    let user: IUser | null;

    // Ensure no duplicates
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const hashedPassword = await hashPassword(password);

    user = new User({ name, email, password: hashedPassword });

    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          return next(err);
        }
        res.json({ user: token }).end();
        return;
      }
    );
  }
);

export const signinUser = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const { email, password } = req.body;

    //see if user exists
    let user: IUser | null = await User.findOne({ email });
    if (!user) {
      return next(new HttpError("Invalid Credentials"));
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return next(new HttpError("Invalid Credentials"));
    }
    //return jsonwebtoken

    const payload = {
      user: { id: user.id },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          return next(err);
        }
        res.json({ token });
      }
    );
  }
);
