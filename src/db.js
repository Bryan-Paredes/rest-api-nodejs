import pg from "pg";
import { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } from "./config.js";

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// pool.query("SELECT NOW()").then((res) => {
//   console.log(res);
// });
