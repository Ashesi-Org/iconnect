import  bcrypt from 'bcrypt';
import "dotenv/config";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import "../auth/googleAuth";
import "../auth/microsoftAuth";
import "../auth/localAuth";
import createHttpError from "http-errors";
import { pool } from "../config/psql";
import { generateUsername } from '../utils/generateUsername';

export const router = Router();


router.get("/google", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:
      process.env.NODE_ENV == "production"
        ? process.env.CLIENT_URI_CALLBACK_PROD
        : process.env.CLIENT_URI_CALLBACK,
    failureRedirect: "/failure",
  })
);



router.get("/microsoft", passport.authenticate("microsoft"));
router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    successRedirect:
      process.env.NODE_ENV == "production"
        ? process.env.CLIENT_URI_CALLBACK_PROD
        : process.env.CLIENT_URI_CALLBACK,
    failureRedirect: "/failure",
  })
);


router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  try {
    req.logOut(() => req.session.destroy((error) => {
      if(error) {
        throw createHttpError(400, "Bad/Invalid logout request") 
      }
    }));

    res.status(200).json({
      isAuth: req.isAuthenticated(),
      message: req.isAuthenticated()
        ? "Currently authenicated"
        : " Currently unauthenticated",
    });
  } catch (error) {
    next(error);
  }
});


router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    failureFlash: true,
  }),
  (req: Request, res: Response) => {
    res.status(200).json({
      success:true,
      message: "Login successful",
      user: req.user, 
    });
  }
);


router.post("/local/signup", async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body;

    const query = {
      text: 'SELECT * FROM user_data WHERE email = $1',
      values: [email],
    };

    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultavatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7b5Uk6-fslFsGiTi_zqcNqdn9QqIC8AMxw&usqp=CAU"
    const insertQuery = {
      text: 'INSERT INTO user_data (email, password,user_name, display_name, avatar_url, role, language) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [email, hashedPassword, generateUsername(displayName.toLowerCase()), displayName, defaultavatar,  'student', 'english'],
    };

    const newUser = await pool.query(insertQuery);
    return res.status(201).json({user:newUser.rows[0],  message: `User ${displayName} created successfully.` });

  } catch (error) {
    res.status(201).json({message: "Cannot register at the moment"});
    next(error);
  }
});
