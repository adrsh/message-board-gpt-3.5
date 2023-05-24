const express = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { postSchema } = require("../middleware/validationMiddleware").schemas;

const router = express.Router();

router.get("/", postController.getPosts);

router.get("/:id", postController.getPost);

router.post(
  "/",
  authMiddleware.authenticate,
  validationMiddleware.validateBody(postSchema),
  postController.createPost
);

router.put(
  "/:id",
  authMiddleware.authenticate,
  validationMiddleware.validateBody(postSchema),
  postController.updatePost
);

router.delete("/:id", authMiddleware.authenticate, postController.deletePost);

module.exports = router;