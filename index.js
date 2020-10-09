const express = require('express')
const app = express()
app.use(express.static('public'))

const bodyParser=require('body-parser')
app.use(bodyParser.json())
const cors=require('cors')
const bearerToken=require('express-bearer-token')

require('dotenv').config()

app.use(cors())
app.use(bearerToken())
const {ProductRoutes, karyawanRoutes, authRoutes, ProductsRoutes, mongoRoutes}=require('./Routes')
app.use('/products',ProductRoutes)
app.use('/karyawan',karyawanRoutes)
app.use('/auth',authRoutes)
app.use('/prod',ProductsRoutes)
app.use('/mongo',mongoRoutes)

const Crypto=require('crypto')

app.get('/encrypt',(req,res)=>{
    console.log(req.query.password)
    var password=req.query.password
    var katakunci='silverfang'
    var hashPassword=Crypto.createHmac('sha256',katakunci).update(password).digest('hex')
    res.send({
        passwordsebelum:password,
        passwordenc:hashPassword,
        panjangpass:hashPassword.length
    })
})


app.listen(5000,()=>console.log('port 5000 active'))
