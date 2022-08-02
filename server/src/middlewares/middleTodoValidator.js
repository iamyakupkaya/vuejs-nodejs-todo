const { body } = require("express-validator");

const registerTodo = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Minimum 2 karakter...")
      .isLength({ max: 30 })
      .withMessage("Maximum 30 karakter...")
      .required()
      .withMessage("İt is required"),

    body("register_content")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Minimum 2 karakter...")
      .isLength({ max: 500 })
      .withMessage("Maximum 30 karakter...")
      .required()
      .withMessage("İt is required"),

    body("register_category")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Minimum 2 karakter...")
      .isLength({ max: 50 })
      .withMessage("Maximum 30 karakter...")
      .required()
      .withMessage("İt is required")
      .lowercase(),

    body("register_degree").trim(),

    body("register_image").trim(),
  ];
};

module.exports = {
  registerTodo,
};
