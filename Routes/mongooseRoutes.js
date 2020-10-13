const Router=require('express').Router()
const {mongooseController}=require('./../controllers')
// const {getkaryawanbyid}=KaryawanControllers


Router.get('/getdata',mongooseController.getdata)


module.exports=Router