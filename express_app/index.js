const express = require("express");
const app = express();
const port = 3001;

const react = require('react')

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/info', (req, res) => {
  res.json({data: 'hello'})
})

app.listen(port, () => {
  console.log("listening on port " + port);
});
