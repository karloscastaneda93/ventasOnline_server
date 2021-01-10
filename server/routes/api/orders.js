const express = require("express");
const router = express.Router();

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const OrdersController = require("../../controllers/orders");

router.get("/orders", OrdersController.getAll);
//router.post("/create_client", ClientController.create);
//router.get("/:id", ClientController.getById);
router.route("/create_order")
    .post(validateBody(schemas.orderSchema), OrdersController.create);

module.exports = router;