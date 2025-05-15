const express = require("express");
const app = express();
const port = 3000;

app.get("/error", (req, res) => {
  throw new Error("Synchroner Fehler im Request Handler!");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
