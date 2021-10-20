let express = require('express');
let router = new express.Router();
let index = require('../controller/indexcontroller.js');


//首页
router.get('/index', index.index);

//登录
router.post('/login', index.login);

//注册
router.post('/rester', index.rester);

module.exports = router;