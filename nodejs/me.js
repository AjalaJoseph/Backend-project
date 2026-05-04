const fs = require('fs')
fs.appendFile('my.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});