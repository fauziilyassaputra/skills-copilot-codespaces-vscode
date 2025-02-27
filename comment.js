// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', function(req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
});

// Add a new comment
app.post('/comments', function(req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data['comments'].push(req.body);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
            if (err) throw err;
            res.end(JSON.stringify(data));
        });
    });
});

// Delete a comment
app.delete('/comments/:id', function(req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data['comments'].splice(req.params.id, 1);
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
            if (err) throw err;
            res.end(JSON.stringify(data));
        });
    });
});

// Update a comment
app.put('/comments/:id', function(req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data['comments'][req.params.id] = req.body;
        fs.writeFile(__dirname + "/" + "comments.json", JSON.stringify(data), function(err) {
            if (err) throw err;
            res.end(JSON.stringify(data));
        });
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});
