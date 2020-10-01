const database= [
    {
        id:1,
        namaProd:'Pisang',
        deskripsi:'kuning',
        harga:25000
    },
    {
        id:2,
        namaProd:'Apel',
        deskripsi:'merah',
        harga:10000
    },
    {
        id:3,
        namaProd:'Jeruk',
        deskripsi:'oranye',
        harga:16000
    }
]

module.exports={
    addProducts:(req,res)=>{
        const { namaProd, deskripsi, harga } = req.body
        if(namaProd&&deskripsi&&harga){
            database.push({
                id:database.length +1,
                namaProd,
                deskripsi,
                harga
            })
            res.send(database)
        } else {
            res.send('error')
        }
    },
    editProductById:(req,res)=>{
        const { id } = req.params
        var idx=database.findIndex((val)=>val.id==id)
        database[idx]={...database[idx],...req.body}
        res.send(database)
    },
    deleteProductById:(req,res)=>{
        const { id } = req.params
        var idx=database.findIndex((val)=>val.id==id)
        database.splice(idx,1)
        res.send(database)
    },
    filterProduct:(req,res)=>{
        const {namaProd,hargaMax,hargaMin}=req.query
        var temp = []
        if(namaProd||hargaMax||hargaMin){
            temp = database.filter((val)=>{
                var hargamin1=true
                var hargamax1=true
                var namaprod1=true
                if(hargaMin){
                    hargamin1 = hargaMin <= val.harga
                }
                if(hargaMax){
                    hargamax1 = hargaMax >= val.harga
                }
                if(namaProd){
                    namaprod1 = val.namaProd.toLowerCase().includes(namaProd.toLowerCase())
                }
                return hargamax1&&hargamin1&&namaprod1
            })
            res.send(temp)
        } else{
            res.send({
                database
            })
        }
    }
}
