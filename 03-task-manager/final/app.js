const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notfound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

//middleware
app.use(express.json())

app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({extended: false}))

//not found middleware
// app.use(notfound)
app.use(errorHandlerMiddleware)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/api/v1/tasks', taskRouter)

