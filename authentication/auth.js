const http = require('http')
const {Pool}= require('pg')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { error } = require('console');
const JWT_SCRETE ="69670d3aec1e1a754a8ab456f32aa13acd23fb218b251b644bb9b0bd1f9a66e1" ;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user_db',
  password: 'Amgreat27!',
  port: 5432, // Default PostgreSQL port
});
const getBody = (request) =>{
  return new Promise((resolve, reject) =>{
    let body ='';
    request.on('data', chunk=>body+=chunk.toString());
    request.on('end', ()=> resolve(JSON.parse(body)))
  })
}

 const server = http.createServer(async (req, res) =>{
      res.setHeader('Content-Type', 'application/json');
       try{
        if(req.url ==="/register" && req.method==="POST"){
          const data = await getBody(req)
          const {email, user_name, password} = data
          if(!email || !user_name || !password){
            res.writeHead(400)
            res.end(JSON.stringify({status:"fail", message:"all fiels are required"}))
          }
          else{
            const hash_password = await bcrypt.hash(password,10)
            const query = 'INSERT INTO user_data(user_name, email, password) VALUES($1, $2, $3)';
            const values = [user_name, email, hash_password];
            await pool.query(query, values);
            // console.log(hash_password)
            // console.log(email, user_name, password)
          res.writeHead(200)
          res.end(JSON.stringify({ status: "success", message: "account created successful" }));
          }
          
        }
        else if(req.url==="/login" && req.method==="POST" ){
          const data = await getBody(req)
          const {email, password} = data
          if(!email || !password){
            res.writeHead(400)
            res.end(JSON.stringify({error: "All fields are required"}))
          }
          else{
            const query = 'SELECT * FROM user_data WHERE email = $1';
            const result = await pool.query(query, [email]);
            if(result.rows.length ===0){
              res.writeHead(401)
              return res.end(JSON.stringify({error:"Invalid email or password"}))
            }
            else{
             const user = result.rows[0]
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch){
              const payload = {
                userId : user.id,
                email:user.email
              }
               const token = jwt.sign(payload, JWT_SCRETE, { expiresIn: '1h' })
              res.writeHead(200)
              return res.end(JSON.stringify({message: "Login Successful", 
                user:{user_name:user.user_name, email:user.email},
                token:token
              }))
            }
            else{
              res.writeHead(400)
              return res.end(JSON.stringify({error:"Invalid crediential"}))
            }
            }
           
          }
        }
        else{
          res.writeHead(404)
          res.end(JSON.stringify({ error: "Not Found" }))
        }
        
       }
       catch(error){
        console.log(error)
        res.writeHead(500)
        res.end(JSON.stringify({error: "internal serval error", }))
       }
    })
    

 server.listen(3000, () => {
  
  console.log('Pure Node.js server running at http://localhost:3000/');
});