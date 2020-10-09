const Router=require('express').Router()
const {authController}=require('./../controllers')
const {auth}=require('./../helpers/Auth')

Router.post('/register',authController.register)
Router.post('/login',authController.login)
Router.get('/verified',auth,authController.verified)
Router.post('/sendverified',authController.sendverified)
Router.get('/keeplogin/:id',authController.keeplogin)

module.exports=Router