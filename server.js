"use 'esversion: 6'";

const express = require('express');
const app = express();
const PORT = 80;

app.use('/', express.static('static'));

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
