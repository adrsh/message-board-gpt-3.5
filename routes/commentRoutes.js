const express = require("express");
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const {
  commentSchema,
} = require("../middleware/validationMiddleware").schemas;

const router = express.Router({ mergeParams: true });

router.get("/", commentController.getComments);

router.post(
  "/",
  authMiddleware.authenticate,
  validationMiddleware.validateBody(commentSchema),
  commentController.createComment
);

router.put(
  "/:id",
  authMiddleware.authenticate,
  validationMiddleware.validateBody(commentSchema),
  commentController.updateComment
);

router.delete(
  "/:id",
  authMiddleware.authenticate,
  commentController.deleteComment
);

module.exports = router;