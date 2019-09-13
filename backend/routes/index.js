var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var md5 = require("md5")
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost";
const client = new MongoClient(uri, { useNewUrlParser: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    let collection = client.db("admin").collection("test");
    //let finish = collection.insertOne({nice: 69})
    client.db("admin").collection("test").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
    // perform actions on the collection object
  });
});

/* GET home page. */
router.get('/posts/:id', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    let collection = client.db("test").collection("devices");
    collection.insertOne({nice: 69})
    // perform actions on the collection object
    client.close();
  });
});

/* GET home page. */
router.get('/users/:id', function(req, res) {
  client.connect(err => {
    console.log(req.query.id)
    if(err != null){
      res.send(err.toString())
    }
    let collection = client.db("longodb").collection("users").find({username: req.query.id}).toArray(function(err, result){
      if(err !== null){
        console.log(err)
      }
      console.log(result)
      bcrypt.compare(md5(req.get("password")), result[0].password, function(err, res) {
        if(err !== null){
          console.log(err)
        }
        if(res === true){
          res.send(result)
        }else{
          res.send("NOT THE RIGHT USER")
        }
      });
    });
  });
});

router.post('/users/', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    try {
      client.db("longodb").collection("users").find({username: req.get("username").toString()}).toArray(function (err, result) {
        if(err !== null){
          console.log(err)
        }
        if (result.toString() === "") {
          bcrypt.hash(md5(req.get("password")), 10, function(err, hash) {
            if(err !== null){
              console.log(err)
            }
            client.db("longodb").collection("users").insertOne(({
              name: req.get("name").toString(), username: req.get("username").toString(), password: hash})
            ).then((ref)=>{
              res.send(ref)
            })
          });
        } else {
          res.send("already a user with this username")
        }
      });
    }catch{
      res.send("an error has occured")
    }
  });
});

router.post('/posts', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    let collection = client.db("test").collection("devices");
    collection.insertOne({nice: 69})
    // perform actions on the collection object
    client.close();
  });
});

router.post('/posts/:id/send', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    let collection = client.db("test").collection("devices");
    collection.insertOne({nice: 69})
    // perform actions on the collection object
    client.close();
  });
});

/* GET home page. */
router.post('/posts/:id/like', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    let collection = client.db("test").collection("devices");
    collection.insertOne({nice: 69})
    // perform actions on the collection object
    client.close();
  });
});

module.exports = router;
