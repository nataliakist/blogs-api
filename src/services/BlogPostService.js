const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createPost = async ({ title, content, categoryIds, userId }) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });

  const categoriesVerifier = await Promise.all(categories);

  if (categoriesVerifier.length !== categoryIds.length) {
  return { message: 'one or more "categoryIds" not found' };
  }

  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ 
      title, content, userId, updated: new Date(), published: new Date(),
    }, { transaction: t });

    await PostCategory.bulkCreate(categoryIds.map((id) => ({
        postId: newPost.id,
        categoryId: id,
      })), { transaction: t });
    return newPost;
  }); 
  return result;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = {
  createPost,
  getAll,
};