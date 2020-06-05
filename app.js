var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
require('./routes/routes')(app);

app.listen(3000, function (err) {
  console.log('Bikeshop-CB running on port: 3000');
});
