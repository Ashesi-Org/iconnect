import cors from "cors";
import express from "express";
import session from "express-session";
import http from "http";
import "dotenv/config";
import passport from "passport";
import { Server } from "socket.io";
import { router as roomRoutes } from "./api/roomRoutes";
import { router as workerRoutes } from "./api/workerRoutes";
import { router as rootRoutes } from "./routes/rootRoutes";
import { router as userRoutes } from "./routes/userRoutes";
import { router as notificationRoutes } from "./routes/notificationRoute"
import { router as authRoutes } from "./routes/authRoutes";
import { router as commentRoutes } from "./routes/commentRoute";
import {router as reportRoutes} from "./routes/reportRoutes"
import {appUserRouter as appUserRoutes} from "./routes/appUserRoutes";
import issueRouter from "./routes/issueRoute";
import categoryRouter from "./routes/categoryRoute";
import swearRouter from "./routes/swearWordsRoutes";

import { logger } from "./config/logger";
import { authMiddleware } from "./middleware/authMiddleware";
import { corsMiddleware } from "./middleware/corsMiddleware";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { httpLogger } from "./middleware/httpLogger";
import { sessionMiddleware } from "./middleware/sessionMiddleware";
import { wrap } from "./utils/wrap";
import { setupWs } from "./ws";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV == "production"
        ? process.env.CLIENT_URI_PROD
        : process.env.CLIENT_URI,
    credentials: true,
  },
});

app.use(cors(corsMiddleware));
app.use(session(sessionMiddleware));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(httpLogger);
app.use(authMiddleware);
// app.use(limiter)

app.use("/", rootRoutes);
app.use("/auth", authRoutes);
app.use("/worker", workerRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/profile", userRoutes);
app.use("/api/user", appUserRoutes);
app.use('/api/issues', issueRouter);
app.use('/api/comments', commentRoutes);
app.use('/api/swearwords', swearRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/notification', notificationRoutes);
app.use('/api/reports', reportRoutes)

app.use(notFoundHandler);
app.use(errorHandler);

io.use(wrap(session(sessionMiddleware)));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));


server.listen(process.env.PORT || 8000, () => {
  (async function () {
    try {
      setupWs(io);
    } catch (error) {
      logger.error(error);
    }
  })();
  logger.info(`listening on port ${8000}`);
});
