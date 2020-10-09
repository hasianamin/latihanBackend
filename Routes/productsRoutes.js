const Router=require('express').Router()
const { productController}=require('./../controllers')

Router.post('/addProd',productController.Addphoto)
Router.get('/allProd',productController.getAllProd)
Router.delete('/delProd/:id',productController.deleteProd)
Router.put('/editProd/:id',productController.editProd)

module.exports=Router