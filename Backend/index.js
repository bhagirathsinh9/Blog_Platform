const dotenv = require('dotenv')
const http = require('http')
const { app } = require('./app')
const { Server } = require('socket.io')
const publishBlogsCron = require('./src/utils/publishBlogs.cron')

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'
dotenv.config({ path: envFile, quiet: true })

const PORT = process.env.PORT
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

app.set('io', io)

io.on('connection', (socket) => {
  // console.log("New client connected:", socket.id);

  socket.on('disconnect', () => {
    // console.log("Client disconnected:", socket.id);
  })
})

publishBlogsCron(io)

server.listen(PORT, () => {
  console.log(`Blogging Platform Server running at http://localhost:${PORT}`)
})
