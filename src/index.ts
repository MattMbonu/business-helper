import express, { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import mongoose from "mongoose";
import HttpError from "./models/HttpError/HttpError";

//#region router-imports

//#endregion router-imports

//#region App setup
dotenv.config();

const app = express();

app.use(express.json());

//#endregion

//#region routes

//#endregion routes

//#region Not Found

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new HttpError("Could not find this route.", 404));
});

//#endregion

//#region error handling

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  return res
    .status(error.code || 500)
    .json({ message: error.message || "an unknown error occured" });
});

//#endregion error handling

//#region Server Initialization

mongoose
  .connect(process.env.DB_CONNECTION_URI as string, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < names.length; i++) {
          console.log(names[i].name);
        }
      }
    });
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`app running on port ${PORT}`));
  })
  .catch((error: Error) => {
    console.log(error);
    process.exit(1);
  });

//#endregion Server Initialization
