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
  .get("/api/dinosaurs/:id", getDinosaur)
  .post("/api/dinosaurs", addDinosaur)
  .put("/api/dinosaurs/:id", upadateDinosaur)
  .delete("/api/dinosaurs/:id", deleteDinosaur);

export default router;
