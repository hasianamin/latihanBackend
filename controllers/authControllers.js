const {db}=require('./../connection')
const {encrypt}=require('./../helpers')
const nodemailer=require('nodemailer')
const fs=require('fs')
const handlebars=require('handlebars')
const {createJWToken}=require('./../helpers/jwt')

let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'hasianamin14@gmail.com',
        pass: 'zdmyshyaqtriljwr'
    },
    tls:{
        rejectUnauthorized:false
    }
})

module.exports={
    register:(req,res)=>{
        const {username,email,password}=req.body
        let hashPassword=encrypt(password)
        let sql='select * from users where username=?'
        db.query(sql,[username],(err,result)=>{
            if(err) return res.status('500').send({message:err})
            if(result.length){
                return res.status('500').send({messagge:'sudah terdaftar'})
            }else{
                var data={
                    username,
                    email,
                    password: hashPassword,
                    lastlogin:new Date()
                }
                sql='insert into users set ?'
                db.query(sql,data,(err, result)=>{
                    if(err) return res.status('500').send({message:err})
                    db.query('select * from users where id = ?',[result.insertId],(err,userlogin)=>{
                        if(err) return res.status(500).send({message:err.message})
                        const htmlrender = fs.readFileSync('index.html','utf8')
                        const template = handlebars.compile(htmlrender)
                        const token=createJWToken({id:userlogin[0].id,username:userlogin[0].username})
                        // const link=`http://localhost:3000/verified?id=${userlogin[0].id}`
                        const link=`http://localhost:3000/verified?token=${token}`
                        const htmlemail=template({name:userlogin[0].username,link})
                        transporter.sendMail({
                            from:'raja bajak laut <hasianamin14@gmail.com',
                            to:email,
                            subject:'konfirmasi email',
                            html:htmlemail
                        },(err)=>{
                            if(err) return res.status(500).send({message:err.message})
                            userlogin[0].token=token
                            return res.send(userlogin[0])
                        })

                    })
                })
            }
        })
    },
    login:(req,res)=>{
        const {username,password}=req.body
        let hashPassword=encrypt(password)
        let sql='select * from users where username = ? and password = ?'
        db.query(sql,[username,hashPassword],(err,result)=>{
            if(err) return res.send({message:err.message})
            if(!result.length) return res.status(500).send({message:'user tidak terdaftar'})
            sql=`update users set ? where id=${db.escape(result[0].id)}`
            var data={
                lastlogin:new Date()
            }
            db.query(sql,data,(err)=>{
                if(err) return res.status(500).send({message:err.message})
                const token=createJWToken({id:result[0].id,username:result[0].username})
                result[0].token=token
                return res.send(result[0])
            })
        })
    },
    verified:(req,res)=>{
        console.log(req.user)
        // const {id}=req.query
        const id=req.user.id
        console.log(id)
        let dataedit={
            isverified:true
        }
        let sql = `update users set ? where id=${db.escape(id)}`
        db.query(sql,dataedit,(err,result)=>{
            if(err) return res.status(500).send({message:err.message})
            sql=`select * from users where id=${db.escape(id)}`
            db.query(sql,(err,results)=>{
                if(err) return res.status(500).send({message:err.message})
                results[0].token=req.token
                res.send(results[0])
            })
        })
    },
    sendverified:(req,res)=>{
        const {username,email,userid}=req.body
        const htmlrender = fs.readFileSync('index.html','utf8')
        const template = handlebars.compile(htmlrender)
        const token=createJWToken({id:userid,username:username})
        const link=`http://localhost:3000/verified?token=${token}`
        const htmlemail=template({name:username,link})
        transporter.sendMail({
            from:'raja bajak laut <hasianamin14@gmail.com',
            to:email,
            subject:'konfirmasi ulang email',
            html:htmlemail
        },(err)=>{
            if(err) return res.status(500).send({message:err.message})
            return res.send(true)
        })
    },
    keeplogin:(req,res)=>{
        const {id}=req.params
        let sql='select * from users where id = ?'
        db.query(sql,[id],(err,datauser)=>{
            if(err) return res.status(500).send({message:err.message})
            const token=createJWToken({id:datauser[0].id,username:datauser[0].username})
            datauser[0].token=token
            return res.send(datauser[0])
        })
    }
}

// zdmyshyaqtriljwr