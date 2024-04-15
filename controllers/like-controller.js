const { prisma } = require('../prisma/prisma-client');

const LikeController = {
  likePost: async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.userId;
    if (!postId) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
    try {
      const existingLike = await prisma.like.findFirst({ where: { postId, userId } });

      if (existingLike) {
        return res.status(400).json({ error: 'Вы уже поставили лайк' });
      }
      const like = await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      res.json(like);
    } catch (error) {
      console.error('Error like post', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  unlikePost: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user.userId;
    if (!id) {
      return res.status(400).json({ error: 'Вы уже поставили дизлайк' });
    }
    try {
      const existingLike = await prisma.like.findFirst({ where: { id, userId } });

      if (!existingLike) {
        return res.status(400).json({ error: 'Нельзя поставить дизлайк' });
      }
      //   if (like.userId !== userId) {
      //     return res.status(403).json({ error: 'Нет доступа' });
      //   }

      const like = await prisma.like.deleteMany({ where: { id, userId } });
      res.json({ like, message: 'Лайк убран' });
    } catch (error) {
      console.error('Deleted like error', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = LikeController;
