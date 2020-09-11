const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
///const { request, response } = require('express');
const stripe = require("stripe")
('sk_test_51HPw3rEPfe1rPtmgjDZRavSRzKtiY2xW9jxtvmFI7jAv2jnFcAEuXxy6T1EK4sWEE9ooQE57z6BdLwe9rS3ih64800BMG3qBDS')

//API

//App config
const app = express();
//Middlewares
app.use(cors({origin:true}));
app.use(express.json());

//API routes
app.get('/',(request,response)=>response.status(200).send('hello world'));

app.post('/payments/create',async (request,response) =>{
    const total = request.query.total;

    console.log('Payment Request Received BOOM !!!!! for this amount>>>>>' ,total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total, //subunits of the currency
        currency:"usd",
    });
    //OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
//Listen Command
exports.api = functions.https.onRequest(app);


//example endpoint
//http://localhost:5001/challenge-16282/us-central1/api

