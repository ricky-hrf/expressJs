import { deletePostById, createPost, getPostById, getAllPosts, updatePost } from "../services/post.services.js";

// controller penambah data baru
export const addPost = (req, res) => {
  try {
    const newPost = createPost(req.body);
    res.status(201).json({
      message: 'postingan baru berhasil ditambahkan',
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: 'gagal menambahkan postingan',
    })
  }
}

// controller mengambil semua data
export const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json({
      message: 'berhasil ambil data',
      data: posts,
      total: posts.length,
    });
  } catch (error) {
    next(error);
  }
}

// controller mengambil data berdasarkan id
export const postById = async (req, res) => {
  const { id } = req.params;
  const postById = await getPostById(id);
  if (!postById) {
    return res.status(404).json({
      message: 'postingan tidak ditemukan',
    })
  }

  res.status(200).json({
    message: 'postingan ditemukan',
    data: postById,
  })
}

// controller penghapus data berdasarkan id
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

export const updatePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updatedPost = await updatePost(id, payload);

    if (!updatedPost) {
      return res.status(404).json({
        message: `postingan dengan id ${id} tidak ditemuakan`,
      });
    }

    return res.status(200).json({
      message: `postingan dengan id ${id} berhasil diupdate`,
      data: updatedPost,
    });
  } catch (err) {
    next(err);
  }

}