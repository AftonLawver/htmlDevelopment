const http = require('http');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body);
    let data = JSON.stringify(req.body, null, 2);
    // save the data to the data.json file
    if (!fs.existsSync(path.join(__dirname, 'public/data.json'))) {
        fs.closeSync(fs.openSync(path.join(__dirname, 'public/data.json'), 'w'));
    }

    fs.appendFile(path.join(__dirname, 'public/data.json'), data + ',\n', function (err){
        if (err) throw err;
        console.log('The data was appended.');
    });
    res.end();
});




