import { deletePostById } from "../services/post.services.js";

export const deletePost = (req, res) => {
  const { id } = req.params;

  const deletePost = deletePostById(id);

  if (!deletePost) {
    return res.status(400).json({
      message: 'postingan tidak ditemukan'
    });
  }

  res.json({
    message: `postingan dengan id ${id} berhasil dihapus`,
    data: deletePost
  });
}