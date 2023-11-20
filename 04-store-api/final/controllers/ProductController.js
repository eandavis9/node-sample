
const Product = require('../models/Product')

const index = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query
    const queryObject = {}
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = { $regex: name, $options: 'i'}
    }

    if(numericFilters) {
        const operatorMap = {
         '>': '$gt', // mongoose, 
         '>=': '$gte',
         '=': '$eq',
         '<': '$lt',
         '<=': '$lte'
        }
 
        const regEx = /\b(<|>|>=|=|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
             const [field,operator,value] = item.split('-')
             if(options.includes(field)) {
                 queryObject[field] = { [operator]:Number(value) }
             }
        })
        console.log(queryObject)
     }

    let result = Product.find(queryObject)

    if(sort) {
        const sortList =  sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if(fields) {
       const fieldList = fields.split(',').join(' ')
       result = result.select(fieldList)
    }

    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
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



