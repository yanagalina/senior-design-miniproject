const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yanagalina:rK@x8UDyB7bEYXS@cluster0-mrpwo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


function hum1_sim() {
	// generate a random value between 0 and 100%
	var val = Math.floor(Math.random() * Math.floor(101));
	// client.connect(err => {
	//   const collection = client.db("senior-design-mp").collection("humidity-sources");
	//   // perform actions on the collection object
	//   client.close();
	// });

}

function hum2_sim() {

}

function temp1_sim() {

}

function temp2_sim() {

}

setInterval(intervalFunc, 1500);