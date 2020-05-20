import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();
const port = 9000;

app.use(router.routes());
app.use(router.allowedMethods());

router.get(
  "/api/items",
  ({ response }: { response: any }) => {
    response.body = "Hello world";
  },
);

console.log(`Server started on ${port}`);
await app.listen({ port });
