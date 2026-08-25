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

// app.get('/',(req,res)=>{
//     res.send("Express Server Started... "); //-> this work like noaml method (write end )
// })
 //// thsi work can do static


// app.get('/home',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/public'))
// })
/// thsi is also can do static 



// app.use()// somthing
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/login.html'))
})

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/signup.html'))
})

app.post('/signupdata',(req,res)=>{
    //// now if data send using get then resive the in query form but if send data usin post then
    // console,log(req.query);
    // userDetail.push(req.query)
    console.log(req.body);
    res.redirect('/login');
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