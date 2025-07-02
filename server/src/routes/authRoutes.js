const router = require('express').Router();

const { registerController, loginController, logoutController, getMe } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register', registerController)
router.post('/login', loginController)
router.post('/logout', authMiddleware, logoutController)
router.get('/me' , authMiddleware , getMe)

module.exports = router