const router = require('express').Router();

router.use('/api/v1', require('./api/push.notif.routes'));

module.exports = router;
