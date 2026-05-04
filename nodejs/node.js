var http = require('http');
const fs = require("fs")
const dt = require('./myfirstModule')
// const me = require('./greeting')
http.createServer((req, res) =>{
  fs.readFile("todo.txt", (error, data)=>{
     res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  })
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write(dt.greating('Ajala Joseph', 20, 'backend Engineer'))
  // res.write(String(dt.calculate(1, '+', 2)))
  // res.end();
}).listen(8080);