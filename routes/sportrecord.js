const Router = require('koa-router');

const sport_record_router = new Router({ prefix: '/sportrecord' });

const {insertRecord} = require('../controllers/sportrecord');

sport_record_router.get('/insert', insertRecord);

module.exports = sport_record_router;