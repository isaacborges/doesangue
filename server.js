//configure the server
const express = require("express")
const server = express()

//configure server to show static files
server.use(express.static('public'))

//configure the template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server
})

//configure the page presentation
server.get("/", function(req, res){
    return res.render("index.html")
})

//allow access in the port 3000
server.listen(3000, function(){
    console.log("Server iniciado")
})