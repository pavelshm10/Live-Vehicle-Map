var express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
var testApi=require('./routes/api');

// console.log("check ",student);

// app.post('/testApi', function(){
//   console.log(request.body);      // your JSON
//    response.send(request.body);    // echo the result back
// });

// app.get('/testApi', function (req, res) { 
//     res.send(vehicles);
// })
app.use(cors());
app.use("/testApi",testApi)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})