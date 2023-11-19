
const Product = require('../models/Product')

const index = async (req, res) => {
    const { featured, company, name } = req.query
    const queryObject = {}
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = name
    }
    const products = await Product.find(queryObject)
    res.status(200).json({ success: true, data: { products, nbHits: products.length}})
}

const store  = async (req, res) => {
    res.status(201).json({msg: 'test store'})
}

const show = async (req, res) => {
    res.status(200).json({msg: 'test show'})
}

const update = async (req, res) => {
    res.status(200).json({msg: 'test update'})
}

const destroy = async (req, res) => {
    res.status(200).json({msg: 'test delete'})
}

module.exports = {
    index, 
    store,
    show,
    update,
    destroy
}



