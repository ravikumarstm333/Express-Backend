import express from 'express'
import dotenv from 'dotenv';

dotenv.config()
const app=express();
app.use(express.static('src/public'));
app.get('/',(req,res)=>{
    res.send("Express Server Started... "); //-> this work like noaml method (write end )
})
app.get('/*splat',(req,res)=>{
    res.status(404).sendFile('/404.html',{
        root:'src/public'
    });
})
const PORT=Number(process.env.PORT )
app.listen(PORT,(err)=>{
    console.log(`Sever runnign on ${PORT}`);
})