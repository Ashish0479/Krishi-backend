const Post = require("../schema/communityschema");  

module.exports = {
  createPost: async (data) => {
    return await Post.create(data);
  },

  getAllPosts: async () => {
    return await Post.find()
      .populate("user", "name email")
      .populate("comments.user", "name")
      .populate("answers.user", "name")
      .sort({ createdAt: -1 });
  },

  getPostById: async (id) => {
    return await Post.findById(id)
      .populate("user", "name email")
      .populate("comments.user", "name")
      .populate("answers.user", "name");
  },

  likePost: async (postId, userId) => {
    return await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
  },

  unlikePost: async (postId, userId) => {
    return await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
  },

  addComment: async (postId, comment) => {
    return await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("user", "name email")
      .populate("comments.user", "name")   // populate comment user name
      .populate("answers.user", "name");   // populate answer user name
  },

  addAnswer: async (postId, answer) => {
    return await Post.findByIdAndUpdate(
      postId,
      { $push: { answers: answer } },
      { new: true }
    )
      .populate("user", "name email")
      .populate("comments.user", "name")
      .populate("answers.user", "name");  // populate answer user name
  },
};
