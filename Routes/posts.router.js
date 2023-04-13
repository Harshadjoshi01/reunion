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
const {PostSchema, CommentSchema, ParamsSchema} = require("../helpers/ValidationSchema");
const {JoiValidator} = require('../validators/joivalidator');

router.post("/posts", verifyAccessToken, JoiValidator(PostSchema), createpost);
router.delete("/posts/:id", verifyAccessToken, JoiValidator(ParamsSchema), deletepost);
router.post("/like/:id", verifyAccessToken,JoiValidator(ParamsSchema), likepost);
router.post("/unlike/:id", verifyAccessToken,JoiValidator(ParamsSchema), unlikepost);
router.post("/comment/:id", verifyAccessToken, JoiValidator(CommentSchema), JoiValidator(ParamsSchema),addcomment);
router.get("/posts/:id", verifyAccessToken,JoiValidator(ParamsSchema), getpost);
router.get("/all_posts", verifyAccessToken, getallposts);

module.exports = router;
