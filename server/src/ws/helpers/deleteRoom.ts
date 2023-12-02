import { pool } from "../../config/psql";

export const deleteRoom = async (roomId: string) => {
  await pool.query(
    `
      DELETE FROM room_info
      WHERE room_id = $1`,
    [roomId]
  );
};
