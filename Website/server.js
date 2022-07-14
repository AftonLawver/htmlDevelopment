const http = require('http');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const express = require("express");
var app = express();

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

