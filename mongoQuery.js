const express = require('express');
const app = express();
const bodyParser= require('body-parser')

global.rollno = [];
global.no = []
global.name = [];
const MongoClient = require('mongodb').MongoClient
app.set("view engine", "ejs");
url = 'mongodb+srv://arya:1112@cluster0.ymmwr.mongodb.net/<dbname>?retryWrites=true&w=majority'
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('test')
    const quotesCollection = db.collection('student')
    app.listen(3001, function() {
      console.log('listening on 3001')
    })

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.get('/mongoQuery', (req, res) => {
      res.sendFile(__dirname + '/querymongo.html')

    })


    app.post('/query', (req, res) => {
      //var name = req.body.name;
      var rollno = req.body.rollno;
      console.log("Rollno: get from post");
      console.log(rollno);

      no[0] = rollno;
      console.log(no[0]);
      res.redirect('/query')

    })

   app.get('/query', (req, res) => {
      //var name = req.body.name;
      //var rollno = req.body.rollno;
      //var name = db.collection('student').findOne({"rollno":rollno})
    db.collection('student').find({"rollno":no[0]}).toArray(function(err, result) {
      //.then(result => {
        console.log("Result form get");
        console.log(result)
        console.log(result.length);
        //console.log(name);
        res.render('mongo1',{result:result});

      })
    //  .catch(error => console.error(error))
    // ...

    })


    //Retrieving All Database

    app.post('/viewAll', (req, res) => {
      res.redirect('/viewAll')

    })

   app.get('/viewAll', (req, res) => {

    db.collection('student').find().toArray(function(err, result) {
      //.then(result => {
        console.log("Result form get");
        console.log(result)
        //console.log(name);
        res.render('mongo1',{result:result});

      })
    //  .catch(error => console.error(error))
    // ...

    })




  }).catch(console.error)


/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
});
*/
