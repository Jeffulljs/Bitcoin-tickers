//jshint esversion:6


const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html"); 
});




app.post('/', function (req, res) {
    
    let crypto = req.body.crypto;
    //console.log(crypto);
    
    let fiat = req.body.fiat;
    //console.log(fiat);
    
    let amout = req.body.amout;
    //console.log(amout);
    
    
    // let baseUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
    
    //let finalUrl = baseUrl + crypto + fiat ;  
    //console.log(finalUrl);

    
    let option = {
        url: 'https://apiv2.bitcoinaverage.com/convert/global',
        method: 'GET',
        qs:{
            from:crypto,
            to:fiat,
            amout:amout
        }
    };
    //console.log(option);
    
    // utilisation de npm request.
    request(option, function (error, response, body) {
        
        //console.log(body);

        let data = JSON.parse(body);
        let price = data.price;

        let date = data.time;  
        
        res.write('<p>date du jour ' + date + '</p>');

        res.write('<h1>' + amout + crypto  + ' vaut actuellement  ' + price  + fiat + '</h1>');

        res.send();
        
        //console.log(price);    
       // console.log(response.statusCode);//permet d'avoir un code d'etat d'une  html requete.
    });

        
});

app.listen(3000, function () {
    console.log("Server start"); 
});