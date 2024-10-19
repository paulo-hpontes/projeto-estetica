const express = require('express');
const router = express();

router.use('/api/users', require('./UserRoutes'));
router.use('/api/agendamento', require('./SchedulingRoutes'));
router.use('/api/servicos', require('./ServiceRoutes'));


module.exports = router;