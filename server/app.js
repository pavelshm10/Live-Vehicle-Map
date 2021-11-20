var express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
var api=require('./routes/api');
var fs = require('fs');
app.use(cors());
let data = fs.readFileSync('./vehicles-location.json');
let vehicles = JSON.parse(data);
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/allIds', function (req, res) { 
//     res.send(vehicles);
// });

app.post('/IdsByPolygon', function (req, res) { 
    const polygon = req.body.path;  
    // var idsInside = findIdsInPolygon(path);
    var idsInside = findIdsInPolygon(polygon)
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

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

