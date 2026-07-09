// Health handler for /health endpoint
export async function handleHealth(): Promise<Response> {
  const healthData = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptime: process.uptime()
  };
  
  return new Response(JSON.stringify(healthData), {
    headers: { "content-type": "application/json" },
    status: 200
  });
}