var snowflake = require('snowflake-sdk');
var connection = snowflake.createConnection({
  account:'uia18318',
  username: 'arya',
  password: 'Sarya1112$',
  region: 'us-west-2',
  database: "TESTDUMP"
});


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
  var name = row["NAME"];

});

app.get('/show', function(req, res) {
    res.render('show',{name:name});

  });

})


stream.on('end', function() {
  console.log('All rows consumed');
});
