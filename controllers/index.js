const karyawanController=require('./karyawanControllers')
const productControllers=require('./productControllers')
const authController=require('./authControllers')
const productController=require('./productController')
const mongoController=require('./mongocontrollers')
const mongooseController=require('./mongooseController')
const socketController=require('./socketControllers')

module.exports={
    karyawanController,
    productControllers,
    authController,
    productController,
    mongoController,
    mongooseController,
    socketController
}