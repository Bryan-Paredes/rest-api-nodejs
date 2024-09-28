import { pool } from "../db.js";

export const getAllUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");

  res.json(rows);
};

export const getUser = async (req, res) => {
  const { userId } = req.params;

  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  if (rows === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(rows[0]);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;

    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [data.name, data.email]
    );

    return res.send(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email ya existe" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const { rowCount } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [userId]
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.sendStatus(204);
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [data.name, data.email, userId]
  );

  return res.json(rows[0]);
};
