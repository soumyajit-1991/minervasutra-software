// const express = require('express');
// const router = express.Router();
// const customerOrderController = require('../controllers/customerOrderController');

// router.get('/', customerOrderController.getAllOrders);
// router.get('/:id', customerOrderController.getOrderById);
// router.post('/', customerOrderController.createOrder);
// router.put('/:id', customerOrderController.updateOrder);
// router.delete('/:id', customerOrderController.deleteOrder);

// module.exports = router;


const express = require("express");
const router = express.Router();
const controller = require("../controllers/customerOrderController");

router.post("/", controller.createOrder);
router.get("/", controller.getAllOrders);

module.exports = router;
