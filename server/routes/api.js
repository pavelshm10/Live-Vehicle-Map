var express = require('express');
var fs = require('fs');
var router=express.Router();

let data = fs.readFileSync('./vehicles-location.json');
let vehicles = JSON.parse(data);

router.get('/', function (req, res) { 
    res.send(vehicles);
});

module.exports=router;