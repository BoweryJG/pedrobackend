// Simple Node.js server for Render deployment
// The main API functionality is handled by Supabase Edge Functions,
// but Render requires a web service that listens on a port.

const http = require('http');
const PORT = process.env.PORT || 3000;

console.log('Dr. Greg Pedro Dental Backend - Powered by Supabase');
console.log('Deployed on Render: https://pedrobackend.onrender.com');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Dr. Greg Pedro Dental Backend');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Periodic log to prevent automatic shutdown on some hosts
const keepAlive = () => {
  console.log(`[${new Date().toISOString()}] Service is still running`);
  setTimeout(keepAlive, 300000); // Log every 5 minutes
};

keepAlive();
