const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.get('/', controller.getOrders);
router.get('/sales-report', controller.salesReport);
router.get('/inventory-report', controller.inventoryReport);
router.get('/:id', controller.getOrder);
router.post('/', controller.createOrder);
router.put('/:id', controller.updateOrderStatus);
router.delete('/:id', controller.deleteOrder);

module.exports = router;
