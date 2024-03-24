const express = require('express');
const PORT = 3000;
const app = express();
app.use(express.json()); 
app.set("view engine", "ejs");

app.listen(PORT, () => console.log(`Listening on ${PORT}`));