const express = require('express');
const bodyParser=require('body-parser');

const promotionRouter=express.Router();

promotionRouter.use(bodyParser.json());
//one group of methods implemented on the express router
//declare end point at / and chain all methods together
// router is mounted at index.js

promotionRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>
{
    res.end('Will send all the promotions to you!');
})
//new
.post((req,res,next)=>{
    res.end('Will add the promotions: '+ req.body.name+
    'with details: '+req.body.description)//post body contains a name property
})//we get the body info from bodyParser

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT not supported on /promotions');
})
.delete((req,res,next)=>{
    res.end('Deleting all the promotions!');
});

module.exports=promotionRouter;