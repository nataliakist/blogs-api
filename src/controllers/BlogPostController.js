const BlogPostService = require('../services/BlogPostService');
const UserService = require('../services/UserService');
const { tokenVerification } = require('../utils/token');

const getUserId = async (token) => {
  const verifiedToken = tokenVerification(token);
  const userEmail = verifiedToken.email;
  const user = await UserService.getByEmail(userEmail);
  console.log(user);
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

const getAll = async (req, res) => {
  const posts = await BlogPostService.getAll();

  return res.status(200).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const post = await BlogPostService.getById(id);

  if (!post) return res.status(404).json({ message: 'Post does not exist' });

  return res.status(200).json(post);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { authorization: token } = req.headers;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const userId = await getUserId(token);

  const updatedPost = await BlogPostService.updateById(title, content, userId, id);
  if (updatedPost.message) return res.status(401).json(updatedPost);

  return res.status(200).json(updatedPost);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;

  try {
    const userId = await getUserId(token);

    if (!userId) return res.status(404).json({ message: 'user does not exist' });
    
    const post = await BlogPostService.getById(id);
    const postUserId = post.dataValues.userId;

    if (userId !== postUserId) return res.status(401).json({ message: 'Unauthorized user' });

    await BlogPostService.deleteById(userId, id);

    return res.status(204).json();
  } catch (err) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
};

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
  deleteById,
};