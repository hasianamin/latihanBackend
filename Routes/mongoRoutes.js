const Router=require('express').Router()
const {mongoController}=require('./../controllers')
const {auth}=require('./../helpers/Auth')

Router.get('/getdata',mongoController.getdata)
Router.post('/postdata',mongoController.adddata)
Router.put('/editdata/:id',mongoController.updatedata)

module.exports=Router