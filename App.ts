import { Application } from "https://deno.land/x/oak@v4.0.0/mod.ts";
import router from "./Routes.ts";

const app = new Application();

const env = Deno.env.toObject();
const port = Number(env.PORT) || 9001;
const host = env.HOST || "127.0.0.1";

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server started on ${host}:${port}`);
await app.listen({ port });
