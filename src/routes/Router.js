const express = require('express');
const router = express();

router.use('/api/users', require('./UserRoutes'));
router.use('/api/scheduling', require('./SchedulingRoutes'));
router.use('/api/services', require('./ServiceRoutes'));
router.use('/api/daysoff', require('./DaysOffRoutes'));
router.use('/api/payment', require('./PaymentRoutes'));


module.exports = router;