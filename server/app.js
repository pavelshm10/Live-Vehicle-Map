var express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST;
var fs = require('fs');
var path = require('path');
app.use(cors());
let data = fs.readFileSync('./vehicles-location.json');
let vehicles = JSON.parse(data);
app.use(express.static("./public"));
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.post('/AllIdsBy', function (req, res) { 
    res.send(vehicles);
});

app.post('/IdsByPolygon', function (req, res) { 
    const polygon = req.body.path;  
    var idsInside = findIdsInPolygon(polygon);
    res.send(idsInside);
});

function findIdsInPolygon(polygon){
     arr=[];
     vehicles.forEach(point => {
        let odd = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
            if (((polygon[i].lat > point.location.lat) !== (polygon[j].lat > point.location.lat)) // One point needs to be above, one below our y coordinate
                && (point.location.lng < ((polygon[j].lng - polygon[i].lng) * (point.location.lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng))) {
                odd = !odd;

            }
            j = i;
        }
        //If the number of crossings was odd, the point is in the polygon
        if(odd){
            arr.push(point);
        }
    });
    return arr;
}

app.listen(port, host, () => {
    console.log(`server is listening ${host}:${port}`)
});

