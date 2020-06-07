const express = require("express")
const server = express()

//configuring the public dir
server.use(express.static("public"))

//template engine usage
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//server paths
//req - requisition , res - result
server.get("/", (req, res) => {
    return res.render("index.html", { title: "A title"})
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
})



//turn on the server
server.listen(3000)