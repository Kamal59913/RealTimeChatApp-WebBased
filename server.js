const express = require('express')
const app = express()
const ejs = require("ejs")
const bodyParser = require("body-parser")
require("./db/mongoose");
const chat = require("./models/chatapp");
const { LOADIPHLPAPI } = require('dns');

const http = require('http').createServer(app)


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
        res.render("index");
    })
    //for post requests

app.post("/", function(req, res) {
    const chat1 = new chat({
        user: req.body.textarea

    })
    chat1.save(function(err) {
        if (err) {
            console.log(err);
        }
    })
})




// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})