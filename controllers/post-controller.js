const prisma = require('../prisma/prisma-client');

const PostController = {
  createPost: async (req, res) => {
    res.send(createPost);
  },
  getAllPosts: async (req, res) => {
    res.send(getAllPosts);
  },
  getPostsById: async (req, res) => {
    res.send(getPostsById);
  },
  deletePost: async (req, res) => {
    res.send(deletePos);
  },
};

module.exports = {
  PostController,
};
