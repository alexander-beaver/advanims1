var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var md5 = require("md5")
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://mongo";
const client = new MongoClient(uri, { useNewUrlParser: false });
var crypto = require('crypto');
var imgur = require('imgur');
//WORKS
router.put("/login", function(req, response, next) {
  try{
    if(req.get("username").toString() === null) response.send({error: "headers not sent"})
    if(req.get("password").toString() === null) response.send({error: "headers not sent"})
  }catch{
    response.send({error: "headers not sent"})
  }
  client.connect(err => {
    if(err != null){
      response.send({error: err.toString()})
    }
    //let finish = collection.insertOne({nice: 69})
    client.db("longodb").collection("users").find({username: req.get("username")}).toArray(function(err, result) {
      if (err) throw err;
      if(result.toString() === ""){
        response.send({Error: "no use with this username"});
      }
      bcrypt.compare(md5(req.get("password")), result[0]["password"], function(err, result) {
        if(result===true)console.log("GOOD LOGIN")
        var sha = crypto.createHash('sha256');
        sha.update(Math.random().toString());
        var token = sha.digest('hex')
        client.db("longodb").collection("users").updateOne({username: req.get("username")}, {$set: {token: token}}).then((responseQ) => {
          response.send({token: token});}
        );
      });
    });
    // perform actions on the collection object
  });
})

router.put("/logout/", function(req, response, next) {
  try{
    if((req.get("token").toString() === null) || req.get("token").toString() === "") response.send({error: "headers not sent"})
  }catch{
    response.send({error: "headers not sent"})
  }
  client.connect(err => {
    if(err != null){
      response.send({error: "ERROR"})
      client.close();
    }else{
    client.db("longodb").collection("users").find({token: req.get("token")}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        response.send({error: "NO USER WITH THIS TOKEN"})
      }else{
      if(result[0]["token"] === req.get("token") && result[0]["token"] !== undefined && req.get("token") !== undefined){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("users").updateOne({username: req.get("username")}, {$set: {token: ""}}).then((responseQ) => {
          response.send({response: "loggedOut"});
        });
      }else{
        response.send({response: "incorrectSessionToken"})
      }}
    })
  }
  })
})

//TODO: NEEDS TESTING
router.get('/posts/:id', function(req, res, next) {
  try{
    if(req.get("username").toString() === null) res.send({error: "headers not sent"})
    if(req.get("token").toString() === null) res.send({error: "headers not sent"})
  }catch{
    res.send({error: "headers not sent"})
  }
  client.connect(err => {
    if(err != null){
      res.send({error: err.toString()})
    }
    console.log("ID: " + req.params.id)
    client.db("longodb").collection("users").find({username: req.get("username")}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        res.send({error: "ERROR"})
        client.close();
      }else{
      if(result[0]["token"] === req.get("token") && result[0]["token"] !== undefined && req.get("token") !== undefined){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("posts").find({username: req.params.id}).toArray(function(err, result) {
          if (err) throw err;
          res.send({result: result});
        });
      }else{
        res.send({result: "incorrectSessionToken"})
      }
    }
    })
    //let finish = collection.insertOne({nice: 69})
    
    // perform actions on the collection object
  })
});


//TODO NEEDS TESTING
router.get('/posts/', function(req, res, next) {
  try{
    if(req.get("username").toString() === null) res.send({error: "headers not sent"})
    if(req.get("token").toString() === null) res.send({error: "headers not sent"})
  }catch{
    res.send({error: "headers not sent"})
  }
  client.connect(err => {
    if(err != null){
      res.send({error: err.toString()})
    }
    //let finish = collection.insertOne({nice: 69})
    client.db("longodb").collection("users").find({username: req.get("username")}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        res.send({error: "ERROR"})
        client.close();
      }else{
      if(result[0]["token"] === req.get("token") && result[0]["token"] !== undefined && req.get("token") !== undefined){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("posts").find({currentUser: req.get("username")}).toArray(function(err, result) {
          if (err) throw err;
          res.send({result: result});
        })
      }else{
        res.send({response: "incorrectSessionToken"})
      }
    }});
    // perform actions on the collection object
  })
});

//WORKS
router.get('/users/:id', function(req, res) {
  try{
    if(req.get("token").toString() === null) res.send({error: "headers not sent"})
  }catch{
    res.send({error: "headers not sent"})
  }
  console.log("PARAMS: " + req.params.id)
  client.connect(err => {
    if(err != null){
      res.send({error: "ERROR"})
      client.close();
    }else{
    client.db("longodb").collection("users").find({username: req.params.id}).toArray(function(err, result) {
      if(err != null|| result.toString() === ""){
        res.send(err.toString())
      } else{
      console.log("PROVIDED TOKEN: " + req.get("token"))
      if(result[0]["token"] === req.get("token") && result[0]["token"] !== undefined && req.get("token") !== undefined){
        console.log("GOOD TOKEN")
        let collection = client.db("longodb").collection("users").find({username: req.params.id}).toArray(function(err, result){
          if(err !== null){
            console.log(err)
          }
          res.send({response: [{username: result[0]["username"], name: result[0]["name"]}]})
        });    
      }else{
        res.send({error: "incorrectSessionToken"})
      }
              
    }
    })
  }
  });
});
//WORKS
router.post('/users/', function(req, res, next) {
  try{
    if(req.get("username").toString() === null) res.send({error: "headers not sent"})
    if(req.get("password").toString() === null) res.send({error: "headers not sent"})
    if(req.get("name").toString() === null) res.send({error: "headers not sent"})
  }catch{
    res.send({error: "headers not sent"})
  }
  client.connect(err => {
    if(err != null){
      res.send({error: "ERROR"})
      client.close();
    }else{
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
              res.send({response: ref})
            })
          });
        } else {
          res.send({response: "already a user with this username"})
        }
      });
    }catch{
      res.send({response: "an error has occured"})
    }}
  });
});
//TODO NEEDS TESTING
router.post('/posts', function(req, res, next) {
  console.log("request")
  try{
    if(req.get("username").toString() === null) res.send({error: "headers not sent"})
    if(req.get("token").toString() === null) res.send({error: "headers not sent"})
    if(req.get("message").toString() === null) res.send({error: "headers not sent"})
  }catch{
    res.send({error: "headers not sent"})
  }
  client.connect(err => {
    if(err != null){
      res.send({error: "ERROR"})
      client.close();
    }else{
    client.db("longodb").collection("users").find({username: req.get("username")}).toArray(function(err, result) {
      if(err != null){
        res.send({error: err.toString()})
      }  
      if(result[0]["token"] === req.get("token") && result[0]["token"] !== undefined && req.get("token") !== undefined){
        console.log("GOOD TOKEN")
        console.log(req.body)
        let img = (req.body["content"].toString())
        console.log('body: ', img);
        client.db("longodb").collection("posts").insertOne(
            ({
              pic: img.toString(),
              currentUser: req.get("username"),
              message: req.get("message"),
              lastUser: null, numberOfForwards: 0}))
            .then((ref) => {
              console.log(ref);
              res.send(ref);
              client.close();
            }).catch(err =>{
              throw err
            });
      }else{
        res.send({error: "incorrectSessionToken"})
      }
    })
  }});
});
//TODO NEEDS TESTING
router.put('/send/', function(req, res, next) {
  client.connect(err => {
    if(err != null) throw err
    client.db("longodb").collection("users").find({username: req.get("currentUser")}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        res.send({error: "ERROR"})
        client.close();
      }else{
        console.log("GOOD TOKEN")
      if(result[0]["token"] === req.get("token") && result[0]["token"] !== undefined && req.get("token") !== undefined){
        console.log("GOOD TOKEN")
        console.log()
        client.db("longodb").collection("users").find({id: req.get("newUser")}).toArray((users) => {
          if (result.toString() === "") {
            res.status(409).send({error: "This user does not exist"})
          }else{
            client.db("longodb").collection("posts").find({_id: new mongo.ObjectID(req.get("id").toString())/*, currentUser: req.get("currentUser")*/}).toArray((err, responseQ) => {
              console.log("RESPONSE!:" + responseQ[0].toString())
              if(err != null || responseQ.toString() === ""){
                res.send({error: "ERROR"})
                client.close();
              }
              client.db("longodb").collection("posts").updateOne({_id: new mongo.ObjectID(req.get("id"))},
                  {$set: {numberOfForwards: responseQ[0]["numberOfForwards"]+1,
                                  lastUser: req.get("currentUser"),
                                  currentUser: req.get("newUser")}}).then((resp) => {      client.close();

                res.send({error: "SENT"});}
              );
              client.close();
            });      
          } 
    });
      }else{
        res.send({response: "incorrectSessionToken"})
        client.close();
      }
    
    }
    })
})
});
//works
router.get('/users', function(req, res, next) {

    client.connect(err => {
      client.db("longodb").collection("users").find().toArray((err, users) => {
        if(err != null || users.toString() === ""){
          res.send({error: "ERROR"})
        }else{
        var usernames = []
        for(var i = 0; i < users.length; i ++){
          usernames.push(users[i]["username"])
        }
        res.send({response: usernames})
      }
      })
    })
  }
);

module.exports = router;
