const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser') // Import cookie-parser
const port = 5000
// MongoDB connection string
const mongo =
  'mongodb+srv://roza:roza@cluster-55.mtj0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-55'
// Importing routes
const authRoutes = require('./routes/auth.route')
const messageRoutes = require('./routes/message.route')
const userRoutes = require('./routes/user.route')
const { server, app } = require('./socket/socket')
const path = require('path')
const ___dirname = path.resolve()
// Servse(express.static('client/build'))
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', express.static(path.join(__dirname, '/client/dist/index.html')))
// Routes for handling frontend
// Middleware
app.use(express.json())
app.use(cookieParser()) // Use cookie-parser to parse cookies
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true, // Ensure cookies are sent along with requests
  }),
)

// Define Routes
app.use('/api/users', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/user', userRoutes)

// MongoDB Connection
mongoose
  .connect(mongo)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))

// Start the server
server.listen(port, () => console.log(`Server running on port ${port}`))
