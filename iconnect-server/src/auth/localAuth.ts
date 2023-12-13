import "dotenv/config";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcrypt"; 
import { UserDTO } from "../types/User";
import { logger } from "../config/logger";
import { generateUsername } from "../utils/generateUsername";
import { pool } from "../config/psql";

interface UserParams {
  user_id: string;
  email: string;
  user_name: string;
  avatar_url: string;
  display_name: string;
  role: string;
  bio: string;
  current_room_id: string;
  last_seen: string;
  created_at: string;
  password: string; 
}

const parseToUserDTO = (params: UserParams): UserDTO => {
  const parsed: UserDTO = {
    userId: params.user_id,
    email: params.email,
    userName: params.user_name,
    avatarUrl: params.avatar_url,
    displayName: params.display_name,
    role: params.role,
    bio: params.bio,
    currentRoomId: params.current_room_id,
    lastSeen: params.last_seen,
    createdAt: params.created_at,
  };

  return parsed;
};

const localStrategyMiddleware = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const { rows } = await pool.query<UserParams>(
        `
        SELECT *
        FROM user_data
        WHERE email = $1;
        `,
        [email]
      );

      if (rows.length > 0) {
        const user = parseToUserDTO(rows[0]);

        // Compare passwords using bcrypt
        bcrypt.compare(password, rows[0].password, (err, result) => {
          if (err) {
            logger.log({ level: "error", message: `${err}` });
            return done(err);
          }
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect email or password' });
          }
        });
      } else {
        return done(null, false, { message: 'Incorrect email or password' });
      }
    } catch (err) {
      logger.log({ level: "error", message: `${err}` });
      return done(err, false);
    }
  }
);

const serializeMiddleware = (user: Partial<UserDTO>, done: any) => {
  logger.info(user);
  done(null, user.userId);
};

const deserializeMiddleware = async (userId: string, done: any) => {
  try {
    const { rows } = await pool.query<UserParams>(
      `
      SELECT *
      FROM user_data
      WHERE user_id = $1;
      `,
      [userId]
    );

    const parsedUserData = parseToUserDTO(rows[0]);
    logger.info(parsedUserData);
    done(null, parsedUserData);
  } catch (err) {
    logger.log({ level: "error", message: `${err}` });
    done(err, null);
  }
};

passport.use('local', localStrategyMiddleware);
passport.serializeUser(serializeMiddleware);
passport.deserializeUser(deserializeMiddleware);
