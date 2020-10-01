const Router=require('express').Router()
const {karyawanController}=require('./../controllers')

Router.get('/',karyawanController.getKaryawan)

Router.get('/:id',karyawanController.getKaryawanById)

Router.post('/',karyawanController.insertKaryawan)

Router.delete('/:id',karyawanController.deleteKaryawanById)

Router.put('/:id',karyawanController.editKaryawanById)

module.exports=Router