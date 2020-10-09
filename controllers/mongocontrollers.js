const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://db_admin:P@ssw0rd@cluster0.ukw3w.mongodb.net/toko?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:true });
const {ObjectID, ObjectId}=require('mongodb')

module.exports={
    //using promise
    // getdata:async(req,res)=>{
    //     try {
    //         // Connect to the MongoDB cluster
    //         await client.connect();
    //         const collection=client.db("sample_airbnb").collection("listingsAndReviews")
    //         let data=await collection.find().limit(3).project({name:1}).toArray()
    //         res.send(data)

    //         // Make the appropriate DB calls
    //         // await  listDatabases(client);
     
    //     } catch (e) {
    //         console.error(e);
    //     } finally {
    //         await client.close();
    //     }
    // }

    //using callback
    // getdata:(req,res)=>{
    //     client.connect(err=>{
    //         if(err) console.log(err)
    //         const collection=client.db("sample_airbnb").collection("listingsAndReviews")
    //         collection.find().limit(10).project({name:1}).toArray((err,result)=>{
    //             if(err) console.log(err)
    //             res.send(result)
    //             // client.close()                
    //         })
    //     })
    // }

    getdata:(req,res)=>{
        MongoClient.connect(uri,{useUnifiedTopology:true},(err,client)=>{
           const collection=client.db("toko").collection("users")
           collection.find().limit(5).toArray((err,result)=>{
                if(err) console.log(err)
                res.send(result)
                client.close()                
            })
        })
    },
    adddata:(req,res)=>{
        const data=req.body
        MongoClient.connect(uri,{useUnifiedTopology:true},(err,client)=>{
            const collection=client.db("toko").collection("users")
            collection.insertMany(data,(err,result)=>{
                if(err) console.log(err)
                res.send(result)
                client.close()
            })
        })
    },
    updatedata:(req,res)=>{
        const data = req.body
        const {id}=req.params
        MongoClient.connect(uri,{useUnifiedTopology:true},(err,client)=>{
            const collection=client.db("toko").collection("users")
            collection.updateOne({_id:new ObjectId(id)},{$set:{nama:data.name}},(err,result)=>{
                if(err) console.log(err)
                res.send(result)
                client.close()
            })
        })
    }
}