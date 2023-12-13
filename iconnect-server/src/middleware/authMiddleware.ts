import { RequestHandler } from "express";

export const authMiddleware: RequestHandler = (req, res, next) => {
  if (
    req.originalUrl.startsWith("/auth") ||
    req.originalUrl == ("/user") ||
    req.originalUrl.startsWith("/worker") ||
    req.originalUrl.includes("/room/leave") ||
    req.originalUrl.includes("/room/destroy") ||
    req.originalUrl.includes("/ping") ||
    req.originalUrl.includes("/soft-delete") ||
    req.originalUrl.includes("/api/categories") ||
    req.originalUrl.includes("/api/issues") ||
    req.originalUrl.includes("/api/user") ||
    req.originalUrl.includes("/api/comments") ||
    req.originalUrl.includes("/api/swearwords") ||
    req.originalUrl.includes("/api/reports")
  ) {
    next();
  } else if (req.user) {
    next();
  } else {
    res.status(401).json({
      error: {
        message: "Unauthorized request for resource",
      },
    });
  }
};
