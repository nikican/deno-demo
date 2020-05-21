import { Application } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import router from "./routes.ts";

const app = new Application();
const port = 9000;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started on ${port}`);
await app.listen({ port });
