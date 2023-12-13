import session, { SessionOptions } from "express-session";
import Store from "connect-redis";
import { redisClient } from "../config/redis";
import "dotenv/config";

const RedisStore = Store(session);

export const sessionMiddleware: SessionOptions = {
  secret: process.env.SESSION_SECRET || "iconnect2023",
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 72 * 60 * 60 * 1000,
    httpOnly:true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "none",
  },

};
