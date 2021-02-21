const express = require("express");
const router = express.Router();
const passport = require('passport');

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const CategoryController = require("../../controllers/categories");

router.get("/", CategoryController.getAll);

router.route("/create")
    .post(validateBody(schemas.categorySchema), CategoryController.create);

router.route("/delete")
    .post(CategoryController.delete);

router.route("/update")
    .post(validateBody(schemas.categorySchema), CategoryController.update);

module.exports = router;