// 引入模块
let express = require('express');
let ejs = require("ejs");
let bodyParser = require('body-parser');
let session = require('express-session');
let indexRoutes = require('./routes/index.js');
let systemRoutes = require('./routes/system.js');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
//2、配置模板引擎
app.set("view engine", "ejs"); //固定写法
//3、配置模板文件所在的目录
app.set("views", __dirname + "/views");
//4、配置静态资源目录
app.use(express.static("public"));

//配置session
app.use(session({
    secret: 'aaa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 60 * 1000
    },
    rolling: true
}));


//拦截路由()拦截登录
app.use((req, res, next) => {
    // console.log(req.url);
    if (req.url != '/api/index' && req.url != '/api/login' && req.url != '/api/rester' && !req.session.username) {
        res.redirect('/api/index');
    } else {
        next();
    }
});


// 配置路由
app.use('/api', indexRoutes);
app.use('/api', systemRoutes);
// app.use('/api', (req, res) => {})





//监听端口
app.listen(4000, () => {
    console.log("4000running");
});