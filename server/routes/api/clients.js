const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const ClientController = require("../../controllers/clients");

router.route("/create")
    .post(validateBody(schemas.clientSchema), ClientController.create);

module.exports = router;