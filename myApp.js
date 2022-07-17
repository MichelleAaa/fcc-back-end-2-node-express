require('dotenv').config();
let express = require('express');
let app = express();

console.log("Hello World");

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);//You can get the request method (http verb), the relative route path, and the caller’s ip from the request object using req.method, req.path and req.ip
    next();
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
    if (process.env.MESSAGE_STYLE == 'uppercase'){
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time});
}); 

app.get("/:word/echo", function(req, res) {
    res.json({echo: req.params.word});
});

module.exports = app;