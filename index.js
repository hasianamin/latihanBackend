const express = require('express')
const app = express()
app.use(express.static('public'))

const bodyParser=require('body-parser')
app.use(bodyParser.json())
const cors=require('cors')

require('dotenv').config()

app.use(cors())

const {ProductRoutes, karyawanRoutes}=require('./Routes')
app.use('/products',ProductRoutes)
app.use('/karyawan',karyawanRoutes)


app.listen(5000,()=>console.log('port 5000 active'))
