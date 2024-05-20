const Router = require('express')
const router = new Router()
const uslovController = require('../controllers/uslovController')

router.post('/', uslovController.create)
router.get('/:id', uslovController.getOne)
router.patch('/:id', uslovController.change)

module.exports = router
