const authorize = (req, res, next) => {
    const { user } = req.query
    if(user === 'taylor') {
        req.user = { name: 'taylor', id: 1}
        next()
    }else{
        res.status(401).send('Unathorized')
    }
    
}

module.exports = { authorize }