const {db}=require('./../connection')

module.exports={
    getKaryawan:(req,res)=>{
        var {page}=req.query
        var sql
        if(page){
            page=parseInt(page)
            sql=`select * from karyawan limit ${(page-1)*5},5`
            db.query(sql,(err,result)=>{
                if(err)return res.send(err)
                else res.send(result)
            })
        }else{
            db.query('select * from karyawan',(err,result)=>{
                if(err)return res.send(err)
                else res.send(result)
            })
        }
    },
    getKaryawanById:(req,res)=>{
        var query = 'select * from karyawan where no=?'
        db.query(query,[req.params.id],(err,result)=>{
            if(err)return res.send(err)
            else res.send(result)
        })
    },
    insertKaryawan:(req,res)=>{
        var data = req.body
        var sql= `insert into karyawan set ?`
        db.query(sql,data,(err)=>{
            if(err) return res.send(err)
            // else res.send(result)
            db.query('select * from karyawan',(err,result)=>{
                if(err) return res.send(err)
                else return res.send(result)
            })
        })
    },
    deleteKaryawanById:(req,res)=>{
        var sql=`delete from karyawan where no = ${db.escape(req.params.id)}`
        db.query(sql,(err)=>{
            if (err) return res.send(err)
            else return res.send('success')
        })
    },
    editKaryawanById:(req,res)=>{
        var data=req.body
        var sql=`update karyawan set ? where no = ${db.escape(req.params.id)}`
        db.query(sql,data,(err)=>{
            if(err) return res.send(err)
            else return res.send('success')
        })
    }
}