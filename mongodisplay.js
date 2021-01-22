var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://arya:1112@cluster0.ymmwr.mongodb.net/<dbname>?retryWrites=true&w=majority";
const express = require('express');
const app = express();

app.set("view engine", "ejs");
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('test')
    const quotesCollection = db.collection('student')
    app.listen(3000, function() {
      console.log('listening on 3000')
    })

    app.get('/get', function(req, res) {
      //MongoClient.connect(url, function(err, db) {
        //if (err) throw err;
        var dbo = db.db("test");
        //var query = { name:"fal" };
        dbo.collection("student").find().toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          //res.send(result);
          res.render('mongo',{result:result});

          db.close();
        });
      //})
      //})
    })

}).catch(console.error)
