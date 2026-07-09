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

    if (url.pathname === "/bank-link-fallback.html") {
      const content = await Deno.readTextFile("./bank-link-fallback.html");
      return new Response(content, { headers: { "content-type": "text/html" } });
    }

    // New endpoint for manual bank connection
    if (url.pathname === "/api/v1/bank-connection" && req.method === "POST") {
      const body = await req.json();
      
      // Validate required fields
      if (!body.routingNumber || !body.accountNumber || !body.accountType) {
        return new Response(JSON.stringify({ error: "Missing required fields: routingNumber, accountNumber, accountType" }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
      
      // Basic validation for routing number (9 digits)
      if (!/^\d{9}$/.test(body.routingNumber)) {
        return new Response(JSON.stringify({ error: "Invalid routing number format" }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
      
      // Basic validation for account number (at least 5 digits)
      if (!/^\d{5,}$/.test(body.accountNumber)) {
        return new Response(JSON.stringify({ error: "Invalid account number format" }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
      
      // Validate account type
      const validAccountTypes = ["checking", "savings"];
      if (!validAccountTypes.includes(body.accountType.toLowerCase())) {
        return new Response(JSON.stringify({ error: "Invalid account type. Must be 'checking' or 'savings'" }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
      
      // In a real implementation, we would securely store this data
      // For now, we'll simulate storage and micro-deposit initiation
      
      // Simulate micro-deposit service integration
      const microDepositResult = await initiateMicroDeposits(body.routingNumber, body.accountNumber, body.accountType);
      
      if (!microDepositResult.success) {
        return new Response(JSON.stringify({ error: microDepositResult.error }), {
          status: 500,
          headers: { "content-type": "application/json" }
        });
      }
      
      // Return success response
      return new Response(JSON.stringify({
        success: true,
        message: "Bank account verification initiated",
        verificationId: microDepositResult.verificationId,
        instructions: "Two small deposits will be made to your account within 1-2 business days. Please check your bank statement and enter the amounts to verify."
      }), {
        status: 201,
        headers: { "content-type": "application/json" }
      });
    }
    
    // New endpoint for verifying micro-deposits
    if (url.pathname === "/api/v1/bank-connection/verify" && req.method === "POST") {
      const body = await req.json();
      
      if (!body.verificationId || !body.deposit1 || !body.deposit2) {
        return new Response(JSON.stringify({ error: "Missing required fields: verificationId, deposit1, deposit2" }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
      
      // Simulate verification process
      const verificationResult = await verifyMicroDeposits(body.verificationId, body.deposit1, body.deposit2);
      
      if (!verificationResult.success) {
        return new Response(JSON.stringify({ error: verificationResult.error }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
      
      return new Response(JSON.stringify({
        success: true,
        message: "Bank account successfully verified"
      }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }
    
    return new Response("Not Found", { status: 404 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

// Simulated micro-deposit service integration
async function initiateMicroDeposits(routingNumber: string, accountNumber: string, accountType: string): Promise<{success: boolean, error?: string, verificationId?: string}> {
  try {
    // In a real implementation, this would call the payments team's micro-deposit service
    // For now, we'll simulate a successful response
    
    // Generate a mock verification ID
    const verificationId = `ver_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      success: true,
      verificationId
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to initiate micro-deposits"
    };
  }
}

// Simulated micro-deposit verification
async function verifyMicroDeposits(verificationId: string, deposit1: number, deposit2: number): Promise<{success: boolean, error?: string}> {
  try {
    // In a real implementation, this would validate the deposit amounts against the verification ID
    // For now, we'll simulate a successful verification
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simple validation - in reality, this would be more complex
    if (deposit1 > 0 && deposit2 > 0 && deposit1 !== deposit2) {
      return { success: true };
    }
    
    return {
      success: false,
      error: "Invalid deposit amounts"
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to verify micro-deposits"
    };
  }
}