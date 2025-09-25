const postRepository = require("../repository/communityRepository");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs/promises");


module.exports = {
  createPost: async (data) => {
     const imagePath = data.image;
        if(imagePath) {
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
                var postImage = cloudinaryResponse.secure_url;
                
                await fs.unlink(process.cwd() + "/" + imagePath);
            } catch(error) {
                console.log(error);
                
            }
            
        }
      const post = await postRepository.createPost({
              ...data,
              image: postImage
          });

          

          return post;
  },

  getAllPosts: async () => {
    const posts = await postRepository.getAllPosts();

    return posts.map((post) => {
      const obj = post.toObject();

      obj.author = obj.user?.name || "Anonymous";

      obj.comments = obj.comments.map((c) => ({
        ...c,
        author: c.user?.name || "Anonymous",
        content: c.text,
      }));

      obj.answers = obj.answers.map((a) => ({
        ...a,
        author: a.user?.name || "Anonymous",
        content: a.text,
      }));

      return obj;
    });
  },

  getPostById: async (id) => {
    const post = await postRepository.getPostById(id);
    const obj = post.toObject();

    obj.author = obj.user?.name || "Anonymous";

    obj.comments = obj.comments.map((c) => ({
      ...c,
      author: c.user?.name || "Anonymous",
      content: c.text,
    }));

    obj.answers = obj.answers.map((a) => ({
      ...a,
      author: a.user?.name || "Anonymous",
      content: a.text,
    }));

    return obj;
  },

  likePost: async (postId, userId) => {
    return await postRepository.likePost(postId, userId);
  },

  unlikePost: async (postId, userId) => {
    return await postRepository.unlikePost(postId, userId);
  },

  addComment: async (postId, comment) => {
    const post = await postRepository.addComment(postId, comment);
    const obj = post.toObject();

    obj.author = obj.user?.name || "Anonymous";

    obj.comments = obj.comments.map((c) => ({
      ...c,
      author: c.user?.name || "Anonymous",
      content: c.text,
    }));

    obj.answers = obj.answers.map((a) => ({
      ...a,
      author: a.user?.name || "Anonymous",
      content: a.text,
    }));

    return obj;
  },

  addAnswer: async (postId, answer) => {
    const post = await postRepository.addAnswer(postId, answer);
    const obj = post.toObject();

    obj.author = obj.user?.name || "Anonymous";

    obj.comments = obj.comments.map((c) => ({
      ...c,
      author: c.user?.name || "Anonymous",
      content: c.text,
    }));

    obj.answers = obj.answers.map((a) => ({
      ...a,
      author: a.user?.name || "Anonymous",
      content: a.text,
    }));

    return obj;
  },
};
