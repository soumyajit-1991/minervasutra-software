//routes/supplierOrderRoutes.js
const express = require('express');
const router = express.Router();
const supplierOrderController = require('../controllers/supplierOrderController');

router.get('/', supplierOrderController.getAllOrders);
router.get('/:id', supplierOrderController.getOrderById);
router.post('/', supplierOrderController.createOrder);
router.put('/:id', supplierOrderController.updateOrder);
router.delete('/:id', supplierOrderController.deleteOrder);

module.exports = router;