Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  
  try {
    if (url.pathname === "/") {
      const content = await Deno.readTextFile("./index.html");
      return new Response(content, { headers: { "content-type": "text/html" } });
    }

    if (url.pathname === "/health") {
      const content = await Deno.readTextFile("./health.json");
      return new Response(content, { headers: { "content-type": "application/json" } });
    }

    if (url.pathname === "/status") {
      const version = await Deno.readTextFile("./VERSION");
      return new Response(JSON.stringify({ version: version.trim() }), { headers: { "content-type": "application/json" } });
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