let { people } = require('../data')

const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people})
}

const createPerson = (req, res) => {
    const { name } = req.body
    if(!name) {
        return res.status(400).json({success: false, msg: 'Please provide name value'})
    }
    res.status(201).json({success: true, person: name })
}

const createPostmanPerson = (req, res) => {
    const { name } = req.body
    if(!name) {
        return res.status(400).json({success: false, msg: 'Please provide name value'})
    }
    res.status(201).json({success: true, data: [...people, name] })
}

const updatePerson = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const person = people.find((item) => item.id === Number(id))

    if(!person){
        return res.status(404).json({success: false, msg: 'Not found'})
    }

    person.name = name

    res.status(200).json({success: true, person })
}

const deletePerson = (req, res) => {
    const { id } = req.params
    const person = people.find((item) => item.id === Number(id))
    if(!person){
        return res.status(404).json({success: false, msg: 'Not found'})
    }

    const list = people.filter((item) => item.id != Number(id) )

    res.status(201).json({success: true, data: list })
}

module.exports = {
    getPeople,
    createPerson,
    createPostmanPerson,
    updatePerson,
    deletePerson
}