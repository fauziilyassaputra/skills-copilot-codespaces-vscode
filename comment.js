// // Create web server
// // Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comment', function(req, res) {
  fs.readFile(__dirname + '/public/comment.json', 'utf8', function(err, data) {
    res.end(data);
  });
});

app.post('/comment', function(req, res) {
  fs.readFile(__dirname + '/public/comment.json', 'utf8', function(err, data) {
    data = JSON.parse(data);
    data.push(req.body);
    fs.writeFile(__dirname + '/public/comment.json', JSON.stringify(data), 'utf8', function(err) {
      res.end(JSON.stringify(data));
    });
  });
});

app.listen(8081, function() {
  console.log('Server is running on port 8081');
});