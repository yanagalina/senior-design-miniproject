const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yanagalina:rK@x8UDyB7bEYXS@cluster0-mrpwo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


function hum1_sim() {

}

function hum2_sim() {

}

function temp1_sim() {

}

function temp2_sim() {
	
}

setInterval(intervalFunc, 1500);