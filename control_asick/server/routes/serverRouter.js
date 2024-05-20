const Router = require('express')
const router = new Router()
const serverController = require('../controllers/serverController')

router.post('/',serverController.create)
router.get('/:id', serverController.getOne)

module.exports = router
