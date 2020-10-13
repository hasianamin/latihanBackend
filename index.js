const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const cors=require('cors')
const bearerToken=require('express-bearer-token')
const http=require('http')
const socketIO=require('socket.io')
require('dotenv').config()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())
app.use(bearerToken())



const server = http.createServer(app)
const io = socketIO(server)

let arrMsg = []
let userCount = 0

app.io = io
app.arrMsg = arrMsg

const {ProductRoutes, 
    karyawanRoutes,
    authRoutes, 
    ProductsRoutes, 
    mongoRoutes,
    mongooseRoutes,
    socketRoutes}=require('./Routes')

const { connect } = require('./connection/mysqldb')


app.use('/products',ProductRoutes)
app.use('/karyawan',karyawanRoutes)
app.use('/auth',authRoutes)
app.use('/prod',ProductsRoutes)
app.use('/mongo',mongoRoutes)
app.use('/mongoose',mongooseRoutes)
app.use('/socket',socketRoutes)

io.on('connection', socket => {
    // userCount++
    userCount++
    socket.on('usercon',()=>{
        console.log('User connectedf')
        console.log(userCount)
        io.emit('user connected', userCount) //emit trigger pasangannya on
    })

    socket.on("tes",(data)=>{
        console.log(data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
      userCount--;
      io.emit('user connected', userCount)
    })
})

server.listen(5000,()=>{
    console.log('Api Aktif di Port 5000')
    // Logger.info(`Express runninng, Listening in port ${5000}`);
})