const BlogPostService = require('../services/BlogPostService');
const UserService = require('../services/UserService');
const { tokenVerification } = require('../utils/token');

const getUserId = async (token) => {
  const verifiedToken = tokenVerification(token);
  const userEmail = verifiedToken.email;
  const user = await UserService.getByEmail(userEmail);
  const userId = user.dataValues.id;

  return userId;
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization: token } = req.headers;

  const userId = await getUserId(token);

  const newPost = await BlogPostService.createPost({ title, content, categoryIds, userId });

  if (newPost.message) return res.status(400).json(newPost);

  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};