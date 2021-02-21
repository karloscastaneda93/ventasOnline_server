const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const OrdersController = require("../../controllers/orders");

router.get("/", OrdersController.getAll);

router.route("/create")
    .post(validateBody(schemas.orderSchema), OrdersController.create);

module.exports = router;