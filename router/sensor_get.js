var MongoClient = require('mongodb').MongoClient;
var express = require('express')
var router = express.Router();

//Get All

router.get('/', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.sdnxw.gcp.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        if(err) throw(err)
        var dbo = client.db(dbName);
        var query = {
            uid : req.headers.uid,
            devicename: req.headers.devicename
        }
        dbo.collection("sensors").find(query).toArray (function (err, result) {
            if(err) throw(err)
            if(query.uid == undefined){
                res.send("Error")
            }
            res.send(result)
            client.close()
        });
    });
});


//Get Last
router.get('/last', (req, res) => {
    const url = 'mongodb+srv://admin:1234@cluster0.sdnxw.gcp.mongodb.net/project_api?retryWrites=true&w=majority';
    const dbName = 'project_api';
    MongoClient.connect(url, function (err, client) {
        if(err) throw(err)
        var dbo = client.db(dbName);
        var query = {
            uid : req.headers.uid,
        }
        dbo.collection("sensors").find(query).toArray (function (err, result) {
            if(err) throw(err)
            if(query.uid == undefined){
                res.send("Error")
            }
            res.send([result[0].inputValue[result[0].inputValue.length - 1]])
            client.close()
        });
    });
});

module.exports = router;
// let data = JSON.stringify(result)
// const mpa1 = result.map(item=>item.users.devices.devicename)

