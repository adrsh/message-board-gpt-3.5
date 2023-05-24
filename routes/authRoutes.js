const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const { authSchema } = require("../middleware/validationMiddleware").schemas;

const router = express.Router();

router.post(
  "/register",
  validationMiddleware.validateBody(authSchema),
  authController.register
);

router.post(
  "/login",
  validationMiddleware.validateBody(authSchema),
  authController.login
);

router.get("/me", authMiddleware.authenticate, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;