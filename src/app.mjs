import express from 'express'
import dotenv from 'dotenv';
import path from 'path'
import { log } from 'console';

dotenv.config()
const app=express();
const __dirname=import.meta.dirname
console.log(__dirname)

app.use(express.static('src/public'));   // middleware  app.use
app.use(express.static('backend/frontend'))
app.get('/',(req,res)=>{
    res.send("Express Server Started... "); //-> this work like noaml method (write end )
})



app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public'))
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/login.html'))
})

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/signup.html'))
})

app.get('/signupdata',(req,res)=>{
    console,log(req.query);
    userDetail.push(req.query)
    res.redirect('/login')
})
app.get('/logindata',(req,res)=>{
    console.log(req.query.username);
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