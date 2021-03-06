const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require('request');


const podStatus = require('./routes/kubernetes/kub');
const sequenceDiagram = require('./routes/kubernetes/kubesequence');
const yaml = require('./routes/yaml');
const mayaVolume = require('./routes/mayaapiserver/listvolume');
const litmusChaos = require('./routes/litmuschaos/inducechaos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();
});

var options = {
    url: 'https://api.github.com/users/inyee786',
    method: 'GET',
    headers: {
        'User-Agent': 'request'
    }
};

http.get(options, function (err, resp, body) {
    if (err) {
        console.log(err);
    } else {
        data = JSON.parse(body);
        console.log(data);
    }
});


app.use('/pod',podStatus)
app.use('/pods',sequenceDiagram) 
app.use('/workloads',yaml);
app.use('/openebs',mayaVolume);
app.use('/litmus',litmusChaos);
module.exports = app;