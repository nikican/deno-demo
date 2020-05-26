import { Router } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import {
  getUsers,
  getUser,
  addUser,
  upadateUser,
  deleteUser,
} from "./controllers/UserController.ts";

const router = new Router();

router.get("/api/users", getUsers)
  .get("/api/users/:id", getUser)
  .post("/api/users", addUser)
  .put("/api/users/:id", upadateUser)
  .delete("/api/users/:id", deleteUser);

export default router;
