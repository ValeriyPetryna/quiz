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

app.use('/css', express.static('css'))
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/firstpage.html')
})
app.get('/secondAnswer', function(req,res) {
    res.sendFile(__dirname + '/secondpage.html')
})
app.get('/success', function(req,res) {
    res.sendFile(__dirname + '/success.html')
})
    
app.post("/firstAnswer", urlencodedParser, function (request, response) {
    if (request.body.answer == 'h5') {
        return response.redirect('/secondAnswer')
    } else {
       // response.send("Try again!")
       //response.send('<script>alert("Incorrect answer!")</script>')
       response.redirect(301, 'back')
    }
})
app.post("/secondAnswer", urlencodedParser, function (request, response) {
    if (request.body.answer == 'b306d5') {
        return response.redirect('/success')
    } else {
        response.redirect(301, 'back')
    }
})

const server = app.listen(port, hostname, () => {
    console.log(new Date() + `  Server running at http://${hostname}:${port}/`)
})