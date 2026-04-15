import pool from "../db.js";

export const bookSeat = async (req, res) => {
  try {
    const id = req.params.id;
    const userEmail = req.user.email; // from token

    const conn = await pool.connect();

    await conn.query("BEGIN");

    const check = await conn.query(
      "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
      [id]
    );

    if (check.rowCount === 0) {
      await conn.query("ROLLBACK");
      return res.send({ error: "Seat already booked" });
    }

    const update = await conn.query(
      "UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1",
      [id, userEmail]
    );

    await conn.query("COMMIT");
    conn.release();

    res.send({ message: "Seat booked successfully" });
  } catch (err) {
    res.send({ error: "Booking failed" });
  }
};
