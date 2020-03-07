//configure the server
const express = require("express")
const server = express()

//configure server to show static files
server.use(express.static('public'))

//configure body of form
server.use(express.urlencoded({extended: true}))

//configure database connetion
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

//configure the template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true
})

//configure the page presentation
server.get("/", function(req, res){
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send("Erro de banco de dados")
        
        const donors = result.rows
        return res.render("index.html", {donors})

    })
})

//get data from the forms
server.post("/", function(req, res){
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    const query = `
        INSERT INTO donors ("name", "email", "blood")
        VALUES ($1, $2, $3)`
    
    const values = [name, email, blood]    

    db.query(query, values, function(err){
        if (err) return res.send("Erro no banco de dados.")

        return res.redirect("/")
    })
})

//allow access in the port 3000
server.listen(3000, function(){
    console.log("Server iniciado")
})