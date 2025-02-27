// Create web server with Express.js
const express = require('express');
const app = express();
const port = 3000;

// Read data from file
const fs = require('fs');
const data = fs.readFileSync('data.json', 'utf8');
const comments = JSON.parse(data);

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(c => c.id === parseInt(id));
  if (!comment) {
    res.status(404).send('Comment not found');
  } else {
    res.json(comment);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});