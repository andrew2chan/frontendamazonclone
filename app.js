var path = require('path');
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());

const port = process.env.PORT | 8080

app.use(express.static('dist'))

app.get('*', function (req, res) { //send everyone to index.html
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, function() {
  console.log("Server on port" + port);
});
