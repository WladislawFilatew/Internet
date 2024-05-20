const Router = require('express')
const router = new Router()
const mainerController = require('../controllers/mainerController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',  mainerController.create)
router.get('/', mainerController.getAll)
router.get('/:id',   mainerController.getOne)
router.patch('/:id', mainerController.change)
router.delete('/:id', mainerController.delMainer)
router.get('/graf/:id', mainerController.getCost)

module.exports = router
