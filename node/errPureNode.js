// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/error") {
    throw new Error("Synchroner Fehler im Request Handler!");
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hallo Welt\n");
});

server.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});

// Kein try...catch um den Fehler im Request Handler
