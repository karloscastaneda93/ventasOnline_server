const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const ClientController = require("../../controllers/clients");

//router.get("/", ClientController.getAll);
//router.post("/create_client", ClientController.create);
//router.get("/:id", ClientController.getById);

router.route("/create_client")
    .post(validateBody(schemas.clientSchema), ClientController.create);

module.exports = router;