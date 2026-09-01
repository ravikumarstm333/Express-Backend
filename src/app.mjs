import express from 'express'
import dotenv from 'dotenv';
import path from 'path'
import { log } from 'console';
import fs from 'fs';
import { json } from 'stream/consumers';

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



app.use(express.urlencoded({ extended: true }));
app.use(express.json())
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

    //// data CRUD
    fs.readFile(path.join(__dirname,'./userCred.json'),'utf-8',(err,data)=>{
        if(err){
            res.sendStatus(500)
        }else{
            let userCred =JSON.parse(data);
            let haveUser=userCred.some((user)=>{
                return user.username == req.body.username || user.email == req.body.email;
                
            });
            if(haveUser){
                return res.status(409).send({error:'User Already Exists'})
               
            }else{
                userCred.push(req.body);
                fs.writeFile(path.join(__dirname,'./userCred.json'),JSON.stringify(userCred),(err)=>{
                    if(err){
                        res.sendStatus(500);
                    }else{
                        res.send({redirectedURL:'/'})
                    }
                })
            }
            
        }
    })


    // console.log(req.body);
    // // res.redirect('/login');  /// its only work url 
    // res.send({redirectedURL:'/login'})
})
app.post('/logindata',(req,res)=>{
    /// data CRUD
    console.log(req.body)
    fs.readFile(path.join(__dirname,'./userCred.json'),'utf-8',(err,data)=>{
        if(err){
            res.sendStatus(500);
        }else{
            let haveUser=(JSON.parse(data)).some(user=>{
                return user.username==req.body.username && user.password== req.body.password;
            })
            if(haveUser){
                res.send({redirectedURL:'/'})
            }else{
                res.send({error:"user does Not exist"})
            }
        }
    })
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