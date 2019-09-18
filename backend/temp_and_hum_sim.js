const express = require('express');
const ObjectID = require('mongodb').ObjectID;
var mongoUtils = require('./mongo_utils');

var db = mongoUtils.getDb();
var hum1_val = 0;
var hum2_val = 0;
var hum3_val = 0;
var temp1_val = 0;
var temp2_val = 0;


function hum1_sim() {
	console.log("sim hum1");
	// generate a value between 0 and 100%
	hum1_val = (hum1_val + 1) % 100;
	const data_coll = db.collection("sensor-data");
	
  data_coll.insertOne({
  	sensor_id : new ObjectID("5d7d06d11c9d440000926594"),
  	date: new Date(Date.now()).toISOString(),
  	value: hum1_val,
    unit: "% (Relative Humidity)",
  }, (err, docs) => {
  	if (err) throw err;
  });
}

function hum2_sim() {
  console.log("sim hum2");
	// generate a value between 0 and 100%
	hum2_val = (hum2_val + 2) % 100;
	const data_coll = db.collection("sensor-data");
	
  data_coll.insertOne({
  	sensor_id : new ObjectID("5d7d07461c9d440000926596"),
  	date: new Date(Date.now()).toISOString(),
  	value: hum2_val,
    unit: "% (Relative Humidity)"
  }, (err, docs) => {
  	if (err) throw err;
  });
}

function hum3_sim() {
  console.log("sim hum3");
  // generate a value between 0 and 100%
  hum3_val = (hum3_val + 1.5) % 100;
  const data_coll = db.collection("sensor-data");
  
  data_coll.insertOne({
    sensor_id : new ObjectID("5d8194ce1c9d4400002b3ea8"),
    date: new Date(Date.now()).toISOString(),
    value: hum3_val,
    unit: "% (Relative Humidity)"
  }, (err, docs) => {
    if (err) throw err;
  });
}

function temp1_sim() {
  console.log("sim temp1");
	// generate a random value between 0 and 100%
	temp1_val = (temp1_val + 1) % 40;
	const data_coll = db.collection("sensor-data");
	
  data_coll.insertOne({
  	sensor_id : new ObjectID("5d7d07611c9d440000926598"),
  	date: new Date(Date.now()).toISOString(),
  	value: temp1_val,
    unit: "°F",
  }, (err, docs) => {
  	if (err) throw err;
  });
}

function temp2_sim() {
  console.log("sim temp2");
	// generate a random value between 0 and 100%
	temp2_val = (temp2_val + 2) % 40;
	const data_coll = db.collection("sensor-data");
	
  data_coll.insertOne({
  	sensor_id : new ObjectID("5d7d8f3f1c9d440000ff3a53"),
  	date: new Date(Date.now()).toISOString(),
  	value: temp2_val,
    unit: "°F"
  }, (err, docs) => {
  	if (err) throw err;
  });
}

setInterval(hum1_sim, 60000);
setInterval(hum2_sim, 60000);
setInterval(hum3_sim, 60000);
setInterval(temp1_sim, 60000);
setInterval(temp2_sim, 60000);