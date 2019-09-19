var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var md5 = require("md5")
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://mongo";
const client = new MongoClient(uri, { useNewUrlParser: false });
var crypto = require('crypto');
var multer = require('multer')
// var gcs = require( 'multer-gcs' );
// var storage = gcs({
//     filename    : function( req, file, cb ) {
        
//         cb( null, file.fieldname + '-' + Date.now() );
        
//     },
//     bucket      : 'bucket-name', // Required : bucket name to upload
//     projectId      : 'dummy-project', // Required : Google project ID
//     keyFilename : '/path/to/keyfile.json', // Required : JSON credentials file for Google Cloud Storage
//     acl : 'publicread' // Optional : Defaults to private
// });
 
//todo logout
var upload = multer({ storage: "uploads/" });
//WORKS
router.put("/login", function(req, response, next) {
  client.connect(err => {
    if(err != null){
      response.send(err.toString())
    }
    //let finish = collection.insertOne({nice: 69})
    client.db("longodb").collection("users").find({username: req.get("username")}).toArray(function(err, result) {
      if (err) throw err;
      bcrypt.compare(md5(req.get("password")), result[0]["password"], function(err, result) {
        if(result===true)console.log("GOOD LOGIN")
        var sha = crypto.createHash('sha256');
        sha.update(Math.random().toString());
        var token = sha.digest('hex')
        client.db("longodb").collection("users").updateOne({username: req.get("username")}, {$set: {token: token}}).then((responseQ) => {
          response.send(token);}
        );
      });
    });
    // perform actions on the collection object
  });
})

router.put("/logout/", function(req, response, next) {
  client.connect(err => {
    if(err != null){
      res.send("ERROR")
      client.close();
    }else{
    client.db("longodb").collection("users").find({username: req.get("username")}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        res.send(err.toString())
      }else{
      if(result[0]["token"] === req.get("token") &&  result[0]["token"] !== ""){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("users").updateOne({username: req.get("username")}, {$set: {token: ""}}).then((responseQ) => {
          response.send("loggedOut");
        });
      }else{
        res.send("incorrectSessionToken")
      }}
    })
  }
  })
})

//TODO: NEEDS TESTING
router.get('/posts/:id', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    console.log("ID: " + req.params.id)
    client.db("longodb").collection("users").find({username: req.params.id}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        res.send("ERROR")
        client.close();
      }else{
      if(result[0]["token"] === req.get("token") &&  result[0]["token"] !== ""){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("posts").find({username: req.params.id}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
        });
      }else{
        res.send("incorrectSessionToken")
      }
    }
    })
    //let finish = collection.insertOne({nice: 69})
    
    // perform actions on the collection object
  })
});


//TODO NEEDS TESTING
router.get('/posts/', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send(err.toString())
    }
    //let finish = collection.insertOne({nice: 69})
    client.db("longodb").collection("users").find({username: req.params.id}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        res.send("ERROR")
        client.close();
      }else{
      if(result[0]["token"] === req.get("token") &&  result[0]["token"] !== ""){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("posts").find({currentUser: req.get("id")}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
        })
      }else{
        res.send("incorrectSessionToken")
      }
    }});
    // perform actions on the collection object
  })
});

//WORKS
router.get('/users/:id', function(req, res) {
  console.log("PARAMS: " + req.params.id)
  client.connect(err => {
    if(err != null){
      res.send("ERROR")
      client.close();
    }else{
    client.db("longodb").collection("users").find({username: req.params.id}).toArray(function(err, result) {
      if(err != null|| result.toString() === ""){
        res.send(err.toString())
      } else{
      if(result[0]["token"] === req.get("token") &&  result[0]["token"] !== ""){
        console.log("GOOD TOKEN")
        let collection = client.db("longodb").collection("users").find({username: req.params.id}).toArray(function(err, result){
          if(err !== null){
            console.log(err)
          }
          res.send([{username: result[0]["username"], name: result[0]["name"]}])
        });    
      }else{
        res.send("incorrectSessionToken")
      }
              
    }
    })
  }
  });
});
//WORKS
router.post('/users/', function(req, res, next) {
  client.connect(err => {
    if(err != null){
      res.send("ERROR")
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
              res.send(ref)
            })
          });
        } else {
          res.send("already a user with this username")
        }
      });
    }catch{
      res.send("an error has occured")
    }}
  });
});
//TODO NEEDS TESTING
router.post('/posts', upload.single('post'), function(req, res, next) {
  client.connect(err => {
    if(err != null || result.toString() === ""){
      res.send("ERROR")
      client.close();
    }else{
    console.log("ID: " + req.params.id)
    client.db("longodb").collection("users").find({username: req.get("username")}).toArray(function(err, result) {
      if(err != null){
        res.send(err.toString())
      }  
      if(result[0]["token"] === req.get("token") &&  result[0]["token"] !== ""){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("posts").insertOne(
          ({id: generate(),
            filelocation: req.file.filename,
            currentUser: req.get("username"),
            message: req.get("message"),
            lastUser: null, numberOfForwards: 0})).then((ref) => {console.log(ref)});
      }else{
        res.send("incorrectSessionToken")
      }
    })
    client.close();
  }});
});
//TODO NEEDS TESTING
router.put('/posts/:id/send', function(req, res, next) {
  client.connect(err => {
    if(err != null) throw err
    client.db("longodb").collection("users").find({username: req.params.id}).toArray(function(err, result) {
      if(err != null || result.toString() === ""){
        res.send("ERROR")
        client.close();
      }else{
      if(result[0]["token"] === req.get("token") &&  result[0]["token"] !== ""){
        console.log("GOOD TOKEN")
        client.db("longodb").collection("users").find({id: req.get("newUser")}).then((users) => {
          if (result.toString() === "") {
            res.send("This user does not exist")
          }else{
            client.db("longodb").collection("posts").find({id: req.get("id")}).then((responseQ) => {
              var sentFrom = responseQ[0]["currentUser"]
              client.db("longodb").collection("users").updateOne({id: req.get("id")}, {$set: {token: token}}).then((resp) => {
                res.send("SENT");}
              );  
            });      
          } 
      client.close();
    });
      }else{
        res.send("incorrectSessionToken")
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
          res.send("ERROR")
        }else{
        var usernames = []
        for(var i = 0; i < users.length; i ++){
          usernames.push(users[i]["username"])
        }
        res.send(usernames)
      }
      })
    })
  }
);

module.exports = router;
function generate(count, k) {
  var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var str = '';

  for(var i = 0; i < count; i++) {
      str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  base.getID(str, function(err, res) {
      if(!res.length) {
        k(str)                   // use the continuation
      } else generate(count, k)  // otherwise, recurse on generate
  });
}
