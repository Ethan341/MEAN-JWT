const express = require('express')
const parser = require('body-parser')
const cors = require('cors');
const JWT = require('./src/services/JWT.service');

const JWTService = new JWT();

const app = express();
app.use(parser.json())
app.use(parser.urlencoded({extended:true}))
app.use(cors());

app.get('/', (req,res)=>{
    console.log("Get req, received");
    res.send("Application Up");
})

app.post('/login',(req,res)=>{
    console.log("reqestDetail ::",req.body);
    if(validateCred(req.body)){
        let jwt = JWTService.createJWT(req.body);
        res.send({
            isValidUser: true,
            jwt: jwt
        });
    }else{ 
        res.send({
            isValidUser: false
        });
    }
})

app.get('/getUserDetails',JWTService.validate,(req,res)=>{
    res.send([1,2,3,4,5,6]);
})
app.listen(3000,
    ()=>{
        console.log("Listening on port 3000")
    })

function validateCred(userDetails){
    if(userDetails.userName == "akash" && userDetails.password == "ok"){
        return true;
    }
    return false;
}

function createJWT(){

}