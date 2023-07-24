const Router = require('koa-router');

const user_router = new Router({ prefix: '/user' });

const {register, login, getInfo, updateMedals, getCurrentCompetition} = require('../controllers/user');

user_router.get('/register', register);
user_router.get('/login', login);
user_router.get('/getInfo', getInfo);
user_router.get('/updateMedals', updateMedals);
user_router.get('/getCurrentCompetition', getCurrentCompetition);

module.exports = user_router;