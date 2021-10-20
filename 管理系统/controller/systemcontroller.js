let { Message } = require('../database/message');
let formidable = require('formidable');
let path = require('path');
const { log } = require('console');

//系统主页+分页器
exports.system = async(req, res) => {
    let page = Number(req.query.page) || 1; //请求的页数
    let size = Number(req.query.size) || 5; //每页显示的数据条数
    let sum = await Message.countDocuments({}); //数据总数
    let totalpages = Math.ceil(sum / size); //计算总的页数
    let mes = await Message.find({}).skip((page - 1) * size).limit(size); //分页查询数据
    // let mes = await Message.find();
    res.render('system', {
        mes: mes,
        size: size,
        sum: sum,
        totalpages: totalpages,
        page: page
    });
};

//添加
exports.addStudents = async(req, res) => {
    // console.log(req.body.usernames);

    var nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDate();
    Number(day) < 10 ? day = 0 + String(day) : day = day;
    Number(month) < 10 ? month = 0 + String(month) : month = month;
    var nowDates = `${year}.${month}.${day}`;


    const form = new formidable();
    form.uploadDir = path.join(__dirname, "../", "public", "upload"); //将上传的文件存放在upload文件夹里
    form.keepExtensions = true; //保留后缀名
    form.parse(req, async(err, fields, files) => {

        // let pic = files ? files.pic.path.split('public')[1] : '/images/1.png';
        let pic = files.pic.name.split('public')[1];
        if (pic) {
            let mes = await Message.create({
                ids: fields.ids,
                usernames: fields.usernames,
                age: fields.age,
                gender: fields.gender,
                class: fields.class,
                place: fields.place,
                date: nowDates,
                pic: pic
            });
        } else {
            let mes = await Message.create({
                ids: fields.ids,
                usernames: fields.usernames,
                age: fields.age,
                gender: fields.gender,
                class: fields.class,
                place: fields.place,
                date: nowDates
            });
        }

    });
    // console.log(files.pic.path.split('public')[1]);

    // await Message.create(req.body);
    res.send('<script>alert("添加成功!");location.href="http://192.168.1.51:4000/api/system"</script>');


};

//查找
exports.searchStudents = async(req, res) => {
    // console.log(req.body.usernames);
    if (req.query.usernames == '') {
        res.send('<script>alert("您输入的信息不能为空!");location.href="http://192.168.1.51:4000/api/system"</script>');
    } else {
        let page = Number(req.query.page) || 1; //请求的页数
        let size = Number(req.query.size) || 3; //每页显示的数据条数
        let sum = await Message.countDocuments({ usernames: req.query.usernames }); //数据总数`
        let totalpages = Math.ceil(sum / size); //计算总的页数
        let mes = await Message.find({ usernames: req.query.usernames }).skip((page - 1) * size).limit(size);
        // mes = [mes];
        console.log(page); //页数
        console.log(totalpages); //总页数
        console.log(req.query); //参数
        console.log(mes); //数据
        console.log(sum);



        // let mes = await Message.find();
        res.render('searchmes', {
            mes: mes,
            size: size,
            sum: sum,
            totalpages: totalpages,
            page: page,
            usernames: req.query.usernames
        });
        // res.render('searchmes', { mes });
    }
};

//删除
exports.removeStudents = async(req, res) => {
    await Message.findOneAndDelete({ _id: req.query.id });
    res.send('<script>alert("删除成功!");location.href="http://192.168.1.51:4000/api/system"</script>');

};

//修改

exports.remes = async(req, res) => {
    let mes = await Message.findOne({ _id: req.query.id });
    res.render('remes', { mes });


};

//替换
exports.replace = async(req, res) => {
    let mes = await Message.findOne({ _id: req.query.id });
    console.log(mes);


    const form = new formidable();
    form.uploadDir = path.join(__dirname, "../", "public", "upload"); //将上传的文件存放在upload文件夹里
    form.keepExtensions = true; //保留后缀名
    form.parse(req, async(err, fields, files) => {

        console.log(files.pic.name);
        if (files.pic.name != '') {
            mes = await Message.updateOne({ ids: mes.ids, usernames: mes.usernames, age: mes.age, class: mes.class, gender: mes.gender, place: mes.place, pic: mes.pic }, {
                ids: fields.ids,
                usernames: fields.usernames,
                age: fields.age,
                gender: fields.gender,
                class: fields.class,
                place: fields.place,
                pic: files.pic.path.split('public')[1]
            });
        } else if (files.pic.name == '') {
            console.log(1);
            mes = await Message.updateOne({ ids: mes.ids, usernames: mes.usernames, age: mes.age, class: mes.class, gender: mes.gender, place: mes.place, pic: mes.pic }, {
                ids: fields.ids,
                usernames: fields.usernames,
                age: fields.age,
                gender: fields.gender,
                class: fields.class,
                place: fields.place,
                // pic: '/images/1.png'
                pic: mes.pic
            });
            console.log(files.pic);
        }



    });

    // mes = await Message.updateOne({ ids: mes.ids, usernames: mes.usernames, age: mes.age, class: mes.class, gender: mes.gender, place: mes.place }, { ids: req.body.ids, usernames: req.body.usernames, age: req.body.age, class: req.body.class, gender: req.body.gender, place: req.body.place });
    res.send('<script>alert("修改成功!");location.href="http://192.168.1.51:4000/api/system"</script>');

};