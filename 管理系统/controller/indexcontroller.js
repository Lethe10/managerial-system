let { User } = require('../database/users');


//入口
exports.index = (req, res) => {
    res.render('index');
};

//注册
exports.rester = async(req, res) => {
    console.log(req.body);
    if (req.body.password == req.body.repassword) {
        let isusername = await User.findOne({ username: req.body.username });
        if (isusername) {
            res.send('<script>alert("用户名已存在");location.href="http://192.168.1.51:4000/api/index"</script>');
        } else {
            User.create({
                username: req.body.username,
                password: req.body.password
            });
            res.send('<script>alert("注册成功!");location.href="http://192.168.1.51:4000/api/index"</script>');
        }
    } else {
        res.send('<script>alert("密码输入不一致");location.href="http://192.168.1.51:4000/api/index"</script>');
    }
};

//登录
exports.login = async(req, res) => {
    let isusername = await User.findOne({ username: req.body.username });
    if (isusername) {
        if (isusername.password == req.body.password) {
            req.app.locals.username = req.body.username; //全局存储username
            req.session.username = req.body.username; //创建session
            res.redirect('/api/system');
        } else {
            res.send('<script>alert("密码错误");location.href="http://192.168.1.51:4000/api/index"</script>');
        }
    } else {
        res.send('<script>alert("用户不存在");location.href="http://192.168.1.51:4000/api/index"</script>');
    }

};