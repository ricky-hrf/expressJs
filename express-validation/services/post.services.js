import crypto from 'crypto';
import { insertPost, findAllPosts, findPostById, updatePostById, deletePost } from '../model/post.model.js';

export const createPost = async ({ author, title, article }) => {
  const newPost = {
    id: crypto.randomUUID(),
    author,
    created_at: new Date(),
    title,
    article,
  }

  return await insertPost(newPost);
};

export const getAllPosts = async () => {
  return await findAllPosts();
}

export const getPostById = async (id) => {
  return await findPostById(id);
}

export const updatePost = async (id, payload) => {
  const affectedRows = await updatePostById(id, payload);

  if (affectedRows === 0) {
    return null;
  }

  return await findPostById(id);
}

export const deletePostById = async (id) => {
  return await deletePost(id);
}