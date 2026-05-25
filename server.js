const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.get('/{*path}', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'canvas.html'), (err) => {
        if (err) {
            console.error("File failed to load:", err);
            res.status(500).send("Server Error"); // Prevents the server from crashing!
        }
    });
});

if(process.env.NODE_ENV != 'production'){
app.listen(3000,()=>{
    console.log("server is running on port 3000"); 
});
}
module.exports = app;