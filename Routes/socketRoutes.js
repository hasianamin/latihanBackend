const Router=require('express').Router()
const {socketController}=require('./../controllers')

// const {getkaryawanbyid}=KaryawanControllers


Router.get('/getdata',socketController.getMessages)
Router.post('/senddata',socketController.sendMessage)
Router.delete('/clearmessages',socketController.clearMessages)


module.exports=Router