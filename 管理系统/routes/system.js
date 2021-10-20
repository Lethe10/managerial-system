let express = require('express');
let router = new express.Router();
let system = require('../controller/systemcontroller.js');


//系统首页
router.get('/system', system.system);

//添加
router.post('/addStudents', system.addStudents);

//查找
// router.post('/searchStudents', system.searchStudents);
router.get('/searchmes', system.searchStudents);
// router.get('/searchmes', system.searchStudents);

//删除
router.get('/removeStudents', system.removeStudents);

//替换页面
router.get('/remes', system.remes);

//替换
router.post('/replace', system.replace);


module.exports = router;