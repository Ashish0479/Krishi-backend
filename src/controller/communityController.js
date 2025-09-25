const postService = require("../services/communityService");

const createPost = async (req, res) => {
  try {
    const data = {
      user: req.user.id,
      question: req.body.question,
      description: req.body.description,
      image: req.file?.path,
    };
    const post = await postService.createPost(data);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await postService.likePost(req.params.id, req.user.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await postService.unlikePost(req.params.id, req.user.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const comment = { user: req.user.id, text: req.body.text };
    
    const post = await postService.addComment(req.params.id, comment);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addAnswer = async (req, res) => {
  try {
    const answer = { user: req.user.id, text: req.body.text };
    const post = await postService.addAnswer(req.params.id, answer);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  likePost,
  unlikePost,
  addComment,
  addAnswer,
};