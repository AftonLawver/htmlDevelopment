
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();
const PORT = process.env.PORT;

const { engine } = require('express-handlebars');
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



app.post('/', (req, res) => {
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

app.post('/send', (req, res) => {
    // To send to me/owner of website
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

    let name = req.body['Name'];
    let email = req.body['Email'];

    const myOAuth2Client = new OAuth2 (
        process.env.OAUTH_CLIENTID,
        process.env.OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    myOAuth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });

    const myAccessToken = myOAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            access_token: myAccessToken
        }
    });

    let mailOptions = {
        from: 'lawverap25@gmail.com',
        to: email,
        subject: 'Nodemailer Project',
        text: 'Dear ' + name + ',\n\nThanks for your feedback!'
    };


    transporter.sendMail(mailOptions,function(err,result){
        if(err){
            res.send({
                message:err
            })
        }else{
            transporter.close();
            res.send({
                message:'Email has been sent: check your inbox!'
            })
        }
    });
});


