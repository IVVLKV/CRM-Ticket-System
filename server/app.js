require('dotenv').config()
let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

let app = express()
let port = 3000
var server = app.listen(port, () => {
  console.log('Server running at http://localhost:' + port)
})

let Ticket = require('./models/ticketModel')
let AuthController = require('./controllers/authentication/AuthController')
let ticketRouter = require('./controllers/TicketController')(Ticket)
let io = require('socket.io').listen(server)

mongoose.connect('mongodb://localhost:27017/API', { useMongoClient: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to the database.')
})

io.sockets.on('connection', function (socket) {
  console.log('user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('add-ticket', (ticketInfo) => {
    io.emit('ticketAdd', {data: ticketInfo})
  })
  socket.on('update-ticket', (ticketInfo) => {
    io.emit('ticketUpdate', {data: ticketInfo})
  })
  socket.on('delete-ticket', (ticketInfo) => {
    io.emit('ticketDelete', {data: ticketInfo})
  })
})

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false)

  // Pass to next layer of middleware
  next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/auth', AuthController)
app.use('/api/tickets', ticketRouter)

app.get('/', (req, res) => {
  res.send('Hi.')
})
