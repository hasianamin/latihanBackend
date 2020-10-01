const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const mysql=require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    port     : 3306
});

db.connect((err)=>{
    if(err)console.log(err)
    else console.log('success')
})

app.use(bodyParser.json())

const {ProductRoutes}=require('./Routes')

app.use('/products',ProductRoutes)

app.get('/karyawan',(req,res)=>{
    db.query('select * from karyawan',(err,result)=>{
        if(err)return res.send(err)
        else res.send(result)
    })
})

app.get('/karyawan/:id',(req,res)=>{
    db.query('select * from karyawan where no=?',[req.params.id],(err,result)=>{
        if(err)return res.send(err)
        else res.send(result)
    })
})

app.listen(5000,()=>console.log('port 5000 active'))
