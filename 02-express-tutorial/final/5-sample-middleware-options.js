const express = require('express')
const app = express()
const morgan = require('morgan') // middleare logger
const { logger } = require('./logger')
const { authorize } = require('./authorize')

// req => middleare => res
// app.use('/api',logger) // apply logger middleware only to router w/ api prefix
// app.use([authorize, logger])

app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('home')
})
app.get('/about', (req, res) => {
    res.send('about')
})

app.get('/api/products', (req, res) => { 
    console.log(req.user)
    res.send('products')
})
app.get('/api/items', (req, res) => {
    res.send('items')
})
app.listen(5000, ()=> {
    console.log('server')
})