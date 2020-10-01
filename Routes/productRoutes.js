const { insertKaryawan } = require('../controllers/karyawanControllers')

const Router=require('express').Router()
const {productController}=require('./../controllers')

Router.post('/',productController.addProducts)

Router.put('/:id',productController.editProductById)

Router.delete('/:id',productController.deleteProductById)

Router.get('/',productController.filterProduct)

module.exports=Router