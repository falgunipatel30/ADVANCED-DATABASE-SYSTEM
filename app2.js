const express = require('express');
const app = express();
const bodyParser= require('body-parser')
var snowflake = require('snowflake-sdk');
var connection = snowflake.createConnection({
  account:'uia18318',
  username: 'arya',
  password: 'Sarya1112$',
  region: 'us-west-2',
  database: "TESTDUMP"
});
global.name = [];
global.rollno = [];
connection.connect(function(err,conn){
  if(err){
    console.log('Unalbe to connect:' + err.message);
  }else{
    console.log('Success ful as id:' + connection.getId());
  }
});
var statement = connection.execute({
  sqlText: 'select * from student',
  streamResult: true
});

var stream = statement.streamRows();

stream.on('error', function(err) {
  console.error('Unable to consume all rows');
});

stream.on('data', function(row) {
  console.log(row["NAME"] + row["ROLLNO"])
   name.push(row["NAME"])
   rollno.push(row["ROLLNO"])

});

app.get('/show', function(req, res) {
    res.render('show',{name:name});
})


stream.on('end', function() {
  console.log('All rows consumed');
});


const MongoClient = require('mongodb').MongoClient
app.set("view engine", "ejs");
url = 'mongodb+srv://arya:1112@cluster0.ymmwr.mongodb.net/<dbname>?retryWrites=true&w=majority'
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('test')
    const quotesCollection = db.collection('student')
    app.listen(3000, function() {
      console.log('listening on 3000')
    })

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')

    })
    app.post('/add', (req, res) => {
      var name = req.body.name;
      var rollno = req.body.rollno;
      var data = {
          "name": name,
          "rollno": rollno
      }
      //quotesCollection.insertOne(req.body.name)
      quotesCollection.insertOne(data)
    .then(result => {
      console.log(result)
      
      res.redirect('/')
    }).catch(error => console.error(error))
    })

    app.get('/get', function(req, res) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        //var query = { name:"fal" };
        dbo.collection("student").find().toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          //res.send(result);
          res.render('index',{result:result});
          db.close();
        });
      })
    })
  }).catch(console.error)
