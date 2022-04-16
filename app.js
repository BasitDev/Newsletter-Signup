'use-strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request'); 
const https = require('https');
const { response } = require('express');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));


app.get('/' , (req , res) => {
    res.sendFile(__dirname +"/signup.html");
    
});

app.post('/', ( req , res ) => {
    console.log('Post is working');

   const firstName = req.body.firstName; 
   const lastName = req.body.lastName; 
   const email =  req.body.email;

   const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
   };

   const jsonData = JSON.stringify(data);

   const url = 'https://us14.api.mailchimp.com/3.0/7b80f67abe';

   const options= {
       method: "POST",
       auth: "basit1227:2acff5aecffcac5c51cdabddf35eb550-us14"
   }

   const request = https.request(url, options, (response) => {
        response.on('data', (data) => {
            console.log(JSON.parse(data));
            
        });
   });

   request.write(jsonData);
   request.end();
    
});

app.listen(3000 , () =>{
    console.log('Server is running on port localhost: 3000');
    
});


// API KEY : 2acff5aecffcac5c51cdabddf35eb550-us14

// id for List : 7b80f67abe 