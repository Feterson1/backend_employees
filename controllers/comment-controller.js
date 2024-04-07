const { prisma } = require('../prisma/prisma-client');

const CommentController = {
  CreateComment: async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user.userId;
    if (!postId || !content) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
    try {
      const comment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content,
        },
      });
      res.json(comment);
    } catch (error) {
      console.error('Error creating comment', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  DeleteComment: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    console.log(id);
    try {
      const comment = await prisma.comment.findUnique({ where: { id } });
      if (!comment) {
        console.log('Ошибка в ненайденом комменте');
        return res.status(404).json({ error: 'Комментарий не найден' });
      }

      if (comment.userId !== userId) {
        console.log('Ошибка в юзере');
        return res.status(403).json({ error: 'Нет доступа' });
      }

      await prisma.comment.delete({ where: { id } });

      res.json(comment);
    } catch (error) {
      console.error('Error deleted comment', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = CommentController;
