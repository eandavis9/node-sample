require('dotenv').config()
require('express-async-errors')

//async errors

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productRoutes = require('./routes/products')


// middleare
const notFoundMiddleWare = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')
const port = process.env.PORT || 6000


app.use(express.json())

// routes

app.get('/', (req, res) => {
    res.send(`<h1>Store API</h1> <a href="api/v1/products">products route</a>`)
})

// product routes
app.use('/api/v1/products', productRoutes)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)


const start = async () => {
    try{
        // connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
