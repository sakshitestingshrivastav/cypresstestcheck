const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from DevOps!");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server }; // Export both

