const express = require('express');
const app = express();
const port = process.env.PORT || 6000;

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

//database connection
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'ado'
});

db.connect((err)=>{
  if(err){
    console.log('database error')
  } 
  else{
    console.log('database connected');
  }
  
});

app.use(express.json());
app.use(bodyParser.urlencoded({extended:"true"}));

//retrieve
app.get('/',(req,res)=>{
  const sql = 'select * from users';
  db.query(sql,(err,results)=>{
    if(err){
      res.json({message:'fetch error'});
    }
    else{
      res.json(results);
    }
  })
});

//register
app.post('/signup',(req,res)=>{
      const {username,password} = req.body;
      const hashedPassword = bcrypt.hash(password,10);
      const sql = 'insert into users(username,password) values(?,?)';
      db.query(sql,[username,hashedPassword],(err,results)=>{
        if(err){
          res.json({message:'failed to register'})
        }
        else{
          res.json(results)
        }
      })
});

//login
app.post('/login',(req,res)=>{
  const {username,password} = req.body;
  const sql = 'select * fro users where username = ?';
  db.query(sql,[username],(err,results)=>{
    if(err) return res.json({message:"server error"});
    if(results.length === 0) return res.json
  })
})

app.listen(port,()=>{
  console.log(`server running on port:${port}`)
});