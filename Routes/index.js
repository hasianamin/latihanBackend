const ProductRoutes=require('./productRoutes')
const ProductsRoutes=require('./productsRoutes')
const karyawanRoutes=require('./karyawanRoutes')
const authRoutes=require('./authRoutes')
const mongoRoutes=require('./mongoRoutes')
const mongooseRoutes=require('./mongooseRoutes')
const socketRoutes=require('./socketRoutes')

module.exports={
    ProductRoutes,
    karyawanRoutes,
    authRoutes,
    ProductsRoutes,
    mongoRoutes,
    mongooseRoutes,
    socketRoutes
}