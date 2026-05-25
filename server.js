const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static(__dirname));
app.use((req,res)=>{
    const filePath = path.join(__dirname,'/public' ,req.url === '/' ? 'canvas.html' : req.url);
    res.sendFile(filePath);
    console.log(filePath);    
});


app.listen(3000,()=>{
    console.log("server is running on port 3000"); 
});