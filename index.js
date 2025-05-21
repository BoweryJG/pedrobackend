// This file serves as a placeholder entry point for Node.js hosting platforms
// The actual functionality is handled by Supabase Edge Functions
const http = require('http');

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] Received request for ${req.url}`);
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'ok',
    message: 'Dr. Greg Pedro Dental Backend - Powered by Supabase',
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`Dr. Greg Pedro Dental Backend - Powered by Supabase`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Deployed on Render: https://pedrobackend.onrender.com`);
});

// This helps prevent automatic shutdown on some hosts
const keepAlive = () => {
  console.log(`[${new Date().toISOString()}] Service is still running`);
  setTimeout(keepAlive, 300000); // Log every 5 minutes
};

keepAlive();
