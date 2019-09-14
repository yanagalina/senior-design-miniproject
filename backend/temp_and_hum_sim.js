const express = require('express');
const ObjectID = require('mongodb').ObjectID;
var mongoUtils = require('./mongo_utils');

var db = mongoUtils.getDb();

function hum1_sim() {
	console.log("sim hum1");
	// generate a random value between 0 and 100%
	var val = Math.floor(Math.random() * Math.floor(101));
	const data_coll = db.collection("sensor-data");
	
  data_coll.insertOne({
  	sensor_id : new ObjectID("5d7d06d11c9d440000926594"),
  	date: new Date(Date.now()).toISOString(),
  	value: val,
  }, (err, docs) => {
  	if (err) throw err;
  });
}

function hum2_sim() {

}

function temp1_sim() {

}

function temp2_sim() {

}

setInterval(hum1_sim, 60000);