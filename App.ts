import { Application } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import router from "./Routes.ts";

const app = new Application();
const port = 9001;

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started on ${port}`);
await app.listen({ port });
