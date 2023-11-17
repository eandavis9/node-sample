const express = require('express')
const router = express.Router()

const {
    getPeople,
    createPerson,
    createPostmanPerson,
    updatePerson,
    deletePerson
} = require('../controllers/PeopleController')

// router.get('/', getPeople)
// router.post('/', createPerson)
 //router.post('/postman', createPostmanPerson)
//router.put('/:id', updatePerson)
//router.delete('/:id', deletePerson)

router.route('/')
        .get(getPeople)
        .post(createPerson)

router.route('/postman').post(createPostmanPerson)

router.route('/:id')
        .put(updatePerson)
        .delete(deletePerson)

module.exports = router