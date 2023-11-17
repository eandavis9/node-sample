const express = require('express')
const path = require('path')
const app = express()

// setup static and middleware
app.use(express.static(path.join(__dirname, 'public')));


//app.get('/', (req,res) => {
    // addid to static assets
 //   res.sendFile(path.resolve(__dirname, 'navbar-app', 'index.html'))
        // ssr
//})

app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
})

app.listen(5000, () => {
    console.log('server')
})