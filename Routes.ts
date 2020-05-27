import { Router } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import {
  getDinosaurs,
  getDinosaur,
  addDinosaur,
  upadateDinosaur,
  deleteDinosaur,
} from "./controllers/DinosaurController.ts";

const router = new Router();

router.get("/api/dinosaurs", getDinosaurs)
  .get("/api/dinosaur/:id", getDinosaur)
  .post("/api/dinosaur", addDinosaur)
  .put("/api/dinosaur/:id", upadateDinosaur)
  .delete("/api/dinosaur/:id", deleteDinosaur);

export default router;
