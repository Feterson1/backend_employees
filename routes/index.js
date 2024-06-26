const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController } = require('../controllers/user-controller');
const authenticateToken = require('../middleware/auth');
const { PostController } = require('../controllers/post-controller');
const CommentController = require('../controllers/comment-controller');
const LikeController = require('../controllers/like-controller');
const FollowController = require('../controllers/follow-controller');

const uploadDestination = 'uploads';
//Показываем где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

// Роуты пользователя
// Роуты для регистрации и авторизации
router.post('/register', UserController.register);
router.post('/login', UserController.login);
// Добавление middleware
router.get('/current', authenticateToken, UserController.current);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put('/users/:id', authenticateToken, uploads.single('avatar'), UserController.updateUser);

// Роуты постов
router.post('/posts/', authenticateToken, PostController.createPost);
router.get('/posts/', authenticateToken, PostController.getAllPosts);
router.get('/posts/:id', authenticateToken, PostController.getPostsById);
router.delete('/posts/:id', authenticateToken, PostController.deletePost);

// Роуты комментариев
router.post('/comment/', authenticateToken, CommentController.CreateComment);
router.delete('/comment/:id', authenticateToken, CommentController.DeleteComment);

// Роуты для лайков
router.post('/likes/', authenticateToken, LikeController.likePost);
router.delete('/likes/:id', authenticateToken, LikeController.unlikePost);
// Роуты для подписок
router.post('/follow/', authenticateToken, FollowController.FollowUser);
router.delete('/unfollow/:id', authenticateToken, FollowController.UnfollowUser);
module.exports = router;
