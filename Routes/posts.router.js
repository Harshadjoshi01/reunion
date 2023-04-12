const express = require("express");
const router = express.Router();
const {
  createpost,
  deletepost,
  likepost,
  unlikepost,
  addcomment,
  getpost,
  getallposts,
} = require("../controllers/posts.controller");
const { verifyAccessToken } = require("../validators/jwtvalidation");

router.post("/posts", verifyAccessToken, createpost);
router.delete("/posts/:id", verifyAccessToken, deletepost);
router.post("/like/:id", verifyAccessToken, likepost);
router.post("/unlike/:id", verifyAccessToken, unlikepost);
router.post("/comment/:id", verifyAccessToken, addcomment);
router.get("/posts/:id", verifyAccessToken, getpost);
router.get("/all_posts", verifyAccessToken, getallposts);

module.exports = router;
