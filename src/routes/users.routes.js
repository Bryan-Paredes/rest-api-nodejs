import Router from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/users", getAllUsers);

router.get("/users/:userId", getUser);

router.post("/users", createUser);

router.delete("/users/:userId", deleteUser);

router.put("/users/:userId", updateUser);

export default router;
