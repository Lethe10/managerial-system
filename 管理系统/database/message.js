const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/students').then(() => {
    console.log('数据库连接成功');
});

const messageSchema = new mongoose.Schema({
    ids: String,
    usernames: String,
    class: String,
    age: String,
    gender: String,
    place: String,
    date: String,
    pic: String
});
const Message = mongoose.model('message', messageSchema);

module.exports = {
    Message
}