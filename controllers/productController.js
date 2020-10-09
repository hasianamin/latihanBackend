const {uploader}=require('./../helpers/uploader')
const fs=require('fs')
const {db}=require('./../connection')

module.exports={
    Addphoto:(req,res)=>{
        try {
            const path='/foto'
            const upload=uploader(path,'TES').fields([{name:'image'}])
            upload(req,res,(err)=>{
                if(err) return res.status(500).json({message:'upload picture failed',error : err.message})
                console.log('upload successful')
                const {image}=req.files
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null
                console.log(imagePath)
                console.log(req.body.data)
                const data = JSON.parse(req.body.data)
                data.image=imagePath
                db.query('insert into products set ?',data,(err)=>{
                    if(err) {
                        if(imagePath){
                            fs.unlinkSync('./public' + imagePath)
                        }
                        return res.status(500).send({message:'upload picture failed',error : err.message})
                    }
                    db.query('select * from products',(err,dataproduct)=>{
                        if(err) return res.status(500).send({message:'get picture failed',error : err.message})
                        return res.status(200).send(dataproduct)
                    })
                })
                // return res.status(200).send('success upload')
            })
        } catch (error) {
            
        }
    },
    getAllProd:(req,res)=>{
        let sql='select * from products'
        db.query(sql,(err,dataproduct)=>{
            if(err) return res.status(500).send({message:'get picture failed',error : err.message})
            return res.status(200).send(dataproduct)
        })
    },
    deleteProd:(req,res)=>{
        const {id}=req.params
        let sql=`select * from products where id=${db.escape(id)}`
        db.query(sql,(err,dataproduct)=>{
            if(err) return res.status(500).send({error : err.message})
            if(dataproduct.length){
                sql=`delete from products where id =${db.escape(id)}`
                db.query(sql,(err)=>{
                    if(err) return res.status(500).send({error : err.message})
                    if(dataproduct[0].image){
                        fs.unlinkSync('./public' + dataproduct[0].image)
                    }
                    sql='select * from products'
                    db.query(sql,(err,allproduct)=>{
                        if(err) return res.status(500).send({error : err.message})
                        return res.status(200).send(allproduct)
                    })
                })
            }else{
                if(err) return res.status(500).send({error : err.message})
            }
        })
    },
    editProd:(req,res)=>{
        const {id}=req.params
        let sql=`select * from products where id=${db.escape(id)}`
        db.query(sql,(err,results)=>{
            if(err) return res.status(500).send({error : err.message})
            if(results.length){
                try {
                    const path='/foto'
                    const upload=uploader(path,'TES').fields([{name:'image'}])
                    upload(req,res,(err)=>{
                        if(err) return res.status(500).json({message:'upload picture failed',error : err.message})
                        console.log('upload successful')
                        const {image}=req.files
                        const imagePath = image ? path + '/' + image[0].filename : null
                        const data = JSON.parse(req.body.data)
                        // data.image=imagePath
                        console.log(imagePath)
                        if(imagePath){
                            data.image=imagePath
                        }
                        db.query(`update products set ? where id=${db.escape(id)}`,data,(err)=>{
                            if(err) {
                                if(imagePath){
                                    fs.unlinkSync('./public' + imagePath)
                                }
                                return res.status(500).send({message:'upload picture failed',error : err.message})
                            }
                            if(imagePath){
                                if(results[0].image){
                                    fs.unlinkSync('./public' + results[0].image)
                                }
                            }
                            db.query('select * from products',(err,allproduct)=>{
                                if(err) return res.status(500).send({error : err.message})
                                return res.status(200).send(allproduct)
                            })
                        })
                    })                    
                } catch (error) {
                    return res.status(500).send({error : err.message})
                }

            }else{
                return res.status(500).send({error : err.message})
            }
        })
    }
}