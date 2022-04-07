var express = require("express");
var app = express();
app.path = require("path");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(express.static("contents"));
var path = require('path')
const assignment = require('./models/schema.js');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'template')));
app.use(express.static(path.join(__dirname, 'template/assets/css/style.css')));
app.use(express.static(path.join(__dirname, 'template/pages/samples')));

// Mongodb Database Connection

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Mani:Mani@cluster0.gdugc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(()=>{
    console.log("mongoose connected" );
});
const connection=mongoose.connection;


app.post('/sendData',function(req,res){
    //res.sendFile(__dirname + '/pages/sample.html');
    console.log(req.body);
    //res.send(req.body);
    var obj = new assignment({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })
    assignment.findOne({email:req.body.email}, function(err,docs){
        if(err || docs==null){
            console.log(err)
            obj.save(function(err, results) {
                if(results){
                   console.log("results"+ results);
                    res.send(results);
                }else{
                    console.log(err)
                    res.send(err);
                }
            })
        }
        else{
            res.sendStatus(500)
        }
    })
   
});


app.post('/deletedatabyid',(req,res)=>{
    //res.sendFile(__dirname + '/pages/sample.html');
    //console.log(req.body);
    //res.send(req.body);
    
    // obj.save(function (err, results) {
    //     if(results){
    //        console.log(results);
    //         res.send(results);
    //     }else{
    //         res.send(err);
    //     }
    // })
    Sample.findOneAndRemove({_id: req.body.id}, req.body, function(err,results)
{
    if(!err){
        console.log("Deleted");
    }else{
        res.send(results)
    }
});


});


app.get('/getassignmentdata',(req,res)=>{
assignment.find(function(err,result){
        if(err || result==null)
        {
            
            console.log(err)
        }
        else if(result!=undefined)
        {
            
            console.log(result)
            res.send(result);
        }
    })
});


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get('/login',function(req,res){
    res.sendFile(__dirname + "/template/pages/samples/login.html");
});
app.get('/signup',function(req,res){
    res.sendFile(__dirname + "/template/pages/samples/register.html");
});
app.get('/adminlogin',function(req,res){
    res.sendFile(__dirname + "/template/pages/samples/admin login.html");
});
app.get('/forgot',function(req,res){
    res.sendFile(__dirname + "/template/pages/samples/forgot.html");
});
app.get('/terms',function(req,res){
    res.sendFile(__dirname+'/template/pages/samples/terms.html');
});




app.listen(4000, ()=> console.log("Successfully Server Started"));