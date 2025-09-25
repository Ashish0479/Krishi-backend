const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });

const {
  createPost,
  getAllPosts,
  likePost,
  unlikePost,
  addComment,
  addAnswer,
} = require("../controller/communityController");
const {isLoggedIn} = require("../validations/authvalidator");
const uploader = require("../middleware/multer");

const router = express.Router();

router.post("/", isLoggedIn, uploader.single("image"), createPost);
router.get("/", getAllPosts);
router.post("/:id/like", isLoggedIn, likePost);
router.post("/:id/unlike", isLoggedIn, unlikePost);
router.post("/:id/comment", isLoggedIn, addComment);
router.post("/:id/answer", isLoggedIn, addAnswer);

module.exports = router;
