import { NextFunction, Request, Response, Router } from "express";
import { pool } from "../config/psql";
import createHttpError from "http-errors";

export const router = Router();

router.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      console.log(userId)
      if (!userId) {
        throw createHttpError(400, "Bad request, invalid credentials sent");
      }

      const { rows: notifications } = await pool.query(
        `
          SELECT * 
          FROM notifications 
          WHERE user_id = $1
          ORDER BY created_at DESC
        `,
        [userId]
      );
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { issue_id, notification_type, message, status } = req.body;

      if (!userId || !issue_id || !message || !status) {
        throw createHttpError(400, "Bad request, invalid credentials sent");
      }

      await pool.query(
        `
          INSERT INTO notifications (user_id, issue_id,notification_type, message, status)
          VALUES ($1, $2, $3, $4, $5)
        `,
        [userId, issue_id, message, status]
      );
      res.status(200).json({ msg: "notification created" });
    } catch (error) {
      next(error);
    }
  }
);


router.patch(
  "/markAsRead/:notificationId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { notificationId } = req.params;

      await pool.query(
        `
          UPDATE notifications
          SET status = 'read'
          WHERE notification_id = $1
        `,
        [notificationId]
      );
      res.status(200).json({ msg: "notification marked as read" });
    } catch (error) {
      next(error);
    }
  }
);


router.patch(
  "/markBatchAsRead",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { notificationIds } = req.body;

      if (!notificationIds || !Array.isArray(notificationIds)) {
        throw createHttpError(400, "Bad request, invalid notification IDs");
      }

      await pool.query(
        `
          UPDATE notifications
          SET status = 'read'
          WHERE notification_id = ANY($1)
        `,
        [notificationIds]
      );
      res.status(200).json({ msg: "notifications marked as read" });
    } catch (error) {
      next(error);
    }
  }
);



router.delete(
  "/:notificationId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { notificationId } = req.params;

      await pool.query(
        `
          DELETE FROM notifications
          WHERE notification_id = $1
        `,
        [notificationId]
      );
      res.status(200).json({ msg: "notification deleted" });
    } catch (error) {
      next(error);
    }
  }
);
