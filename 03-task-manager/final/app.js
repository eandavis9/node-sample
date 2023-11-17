const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const port = 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('Server')
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

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/api/v1/tasks', taskRouter)

