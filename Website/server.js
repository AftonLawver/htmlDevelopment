const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
app.use(express.json());



// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



app.post('/', (req, res) => {
    console.log(req.body.email);
    let data = JSON.stringify(req.body, null, 2);
    // save the data to the data.json file
    if (!fs.existsSync(path.join(__dirname, 'public/data.json'))) {
        fs.closeSync(fs.openSync(path.join(__dirname, 'public/data.json'), 'w'));
    }

    fs.appendFile(path.join(__dirname, 'public/data.json'), data + ',\n', function (err){
        if (err) throw err;
        console.log('The data was appended.');
    });

    // const output = `
    //     <p>You have a new contact request</p>
    //     <h3>Contact Details</h3>
    //     <ul>
    //         <li>Name: ${req.body.name}</li>
    //         <li>Email: ${req.body.email}</li>
    //         <li>Address: ${req.body.address}</li>
    //         <li>State: ${req.body.state}</li>
    //         <li>City: ${req.body.city}</li>
    //         <li>Zip: ${req.body.zipcode}</li>
    //         <li>Phone: ${req.body.phone}</li>
    //
    //     </ul>
    //     <h3>Message</h3>
    //     <p>${req.body.comments}</p>
    // `;
    res.end();

});


