const express = require("express");
const router = express.Router();
const passport = require('passport');

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const CategoryController = require("../../controllers/categories");

router.get("/getAll", CategoryController.getAll);

router.route("/create")
    .post(validateBody(schemas.categorySchema), CategoryController.create);

module.exports = router;