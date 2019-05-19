const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const urlencodedParser = bodyParser.urlencoded({extended: false})
const hostname = '127.0.0.1'
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use('/quiz', express.static('quiz'))
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/firstpage.html')
})
app.get('/secondAnswer', function(req,res) {
    res.sendFile(__dirname + '/secondpage.html')
})
app.get('/error', function(req,res) {
    res.sendFile(__dirname + '/secondpage.html')
})
    
app.post("/firstAnswer", urlencodedParser, function (request, response) {
    if (request.body.answer == 5) {
        return response.redirect('/secondAnswer')
    } else {
       // response.send("Try again!")
       //response.send('<script>alert("Incorrect answer!")</script>')
       response.redirect(301, 'back')
    }
})
app.post("/secondAnswer", urlencodedParser, function (request, response) {
    if (request.body.answer == 6) {
        return response.send("<h1>Great!</h1>")
    } else {
        response.redirect(301, 'back')
    }
})

const server = app.listen(port, hostname, () => {
    console.log(new Date() + `  Server running at http://${hostname}:${port}/`)
})