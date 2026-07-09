import { handleHealth } from "./health_handler.ts";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  
  try {
    if (url.pathname === "/") {
      const content = await Deno.readTextFile("./index.html");
      return new Response(content, { headers: { "content-type": "text/html" } });
    }

    if (url.pathname === "/health") {
      return await handleHealth();
    }

    if (url.pathname === "/bank-link-fallback.html") {
      const content = await Deno.readTextFile("./bank-link-fallback.html");
      return new Response(content, { headers: { "content-type": "text/html" } });
    }

    return new Response("Not Found", { status: 404 });
  } catch (_error) {
    return new Response("Internal Server Error", { status: 500 });
  }
});