const express=require('express');
const http=require('http');
const morgan=require('morgan');
const hostname='localhost';
const port='3000';
const bodyParser=require('body-parser');


const app=express();
app.use(morgan('dev'));//logs traffic 
app.use(bodyParser.json);//allows us to parse req message added to req as req.body
//dishes is end point
app.all('/dishes',(req,res,next)=>
//all CRUD requests this code executes first
    {
        res.statusCode=200;
        res.setHeader('Content-type','text/plaing');
        next();//call next will look for code below that matches dishes end point
    }
);
//req and res are passed from above
get.get('/dishes',(req,res,next)=>
{
    res.end('Will send all the dishes to you!');
});
//new
app.post('/dishes',(req,res,next)=>{
    res.end('Will add the dish: '+ req.body.name+
    'with details: '+req.body.description)//post body contains a name property
});//we get the body info from bodyParser

app.put('/dishes',(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT not supported on /dishes');
});
app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting all the dishes!');
});
//:dishId is a param
app.get('/dishes/:dishId',(req,res,next)=>
{
    res.end('Will send details of the dish: '
    +req.params.dishId +'to you!');
});
//new
app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403;
    res.end('POST not supported on /dishes/'+req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish: '+req.params.dishId+'\n');
    res.end('Will update the dish: '+req.body.name+'with details: '+req.body.description);
});
app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Deleting dish: '+req.params.dishId);
});


app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{    
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end("<html><body><h1>This is an Express Server</h1></body></html>")
});

const server=http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server Running at http://${hostname}:${port}`)
} );