const { insertKaryawan } = require('../controllers/karyawanControllers')

const Router=require('express').Router()
const {productControllers}=require('./../controllers')

Router.post('/',productControllers.addProducts)

Router.put('/:id',productControllers.editProductById)

Router.delete('/:id',productControllers.deleteProductById)

Router.get('/',productControllers.filterProduct)

module.exports=Router