import posts from '../data/posts.js';

export const deletePostById = (id) => {
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    return null;
  }

  const deletePost = posts.splice(index, 1);
  return deletePost[0];
}