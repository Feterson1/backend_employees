const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController } = require('../controllers/user-controller');
const authenticateToken = require('../middleware/auth');

const uploadDestination = 'uploads';
//Показываем где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });
// Роуты для регистрации и авторизации
router.post('/register', UserController.register);
router.post('/login', UserController.login);
// Добавление middleware
router.get('/current', authenticateToken, UserController.current);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put('/users/:id', authenticateToken, UserController.updateUser);

module.exports = router;
