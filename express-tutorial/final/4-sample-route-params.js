const express = require('express')
const app = express()

const { products } = require('./data')


app.get('/', (req, res) => {
    res.send(`<h1> Home Page</h1> <a href="api/products/">Producst</a>`)
})

app.get('/api/products', (req, res) => {
    const lists = products.map((product) => {
        const { id, name, image } = product
        return { id, name, image }
    })

    res.json(lists)
})

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params
    const item = products.find((item) => item.id === Number(id))

    if(!item) {
        return res.status(404).send('Not Found')
    }
    res.json(item)
})

app.get('/api/products/:id/reviews/:reviewID', (req, res) => {
    res.send('revie')
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query
    let sorted = [...products]
    
    if(search) {
        sorted = sorted.filter((product) => {
            return product.name.startsWith(search)
        })
    }

    if(limit) {
        sorted = sorted.slice(0, Number(limit))
    }

    if(sorted.length < 1) {
        return res.status(200).json({success: true, data: []})
    }
    res.status(200).send(sorted)
})

app.listen(5000, () => {
    console.log('server')
})