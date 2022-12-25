const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = 4000;


app.use(cors());
app.use(express.json());

//database connect
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"app1"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });




//getdata
app.get("/getData" , (req , res)=>{

    const query = "select * from information";

    con.query(query , (err , result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })
})


//postData
app.post('/addProduct' , (req , res)=>{

    const query = 'insert into information set ?';
    const data = req.body;
    con.query(query , data , (err , result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })
})


//deleteProduct

app.delete('/deleteProduct/:id' , (req , res)=>{

    const query = `DELETE FROM information WHERE id=${req.params.id} `;

    con.query(query , (err , result)=>{
        if(err){
            throw err;
        }
        else{
            res.send(result)
        }
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})