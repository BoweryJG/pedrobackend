// This file serves as a placeholder entry point for Node.js hosting platforms
// The actual functionality is handled by Supabase Edge Functions

console.log('Dr. Greg Pedro Dental Backend - Powered by Supabase');
console.log('Deployed on Render: https://pedrobackend.onrender.com');

// This helps prevent automatic shutdown on some hosts
const keepAlive = () => {
  console.log(`[${new Date().toISOString()}] Service is still running`);
  setTimeout(keepAlive, 300000); // Log every 5 minutes
};

keepAlive();
