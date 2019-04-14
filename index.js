//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html"); 
});

// utilisation de npm request.

app.post('/', function (req, res) {
    
    request('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD', function (error, response, body) {
        
        //console.log(body);

        let data = JSON.parse(body);
        let price = data.last;

        console.log(price);
        

        
       // console.log(response.statusCode);//permet d'avoir un code d'etat d'une  html requete.
    });
        
});

app.listen(3000, function () {
    console.log("Server start"); 
});