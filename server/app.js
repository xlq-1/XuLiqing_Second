//引入express框架
const express = require('express');
//路径处理模块
const path = require('path');
const formidable = require('formidable');
const bodyParser = require('body-parser');
//创建web服务器
const app = express();

//监听端口
app.listen(8080, () => {
    console.log("服务已启动");
})




// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));


// 实现文件上传的路由
app.post('/upload', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const form = new formidable.IncomingForm({
        encoding: 'utf-8',
        uploadDir: path.join(__dirname, 'public', 'upload'),
        keepExtensions: true
    });
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
        // res.send({
        //     path: files.avatar.filepath.split('public')[1]
        // });
        res.send(files.avatar.filepath);
    });
});


// 头像上传
app.post('/user/upload', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');

    const form = new formidable.IncomingForm({
        encoding: 'utf-8',
        uploadDir: path.join(__dirname, 'public', 'upload'),
        keepExtensions: true
    });
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
        // res.send({
        //     path: files.attrName.filepath.split('public')[1]
        // });
        res.send(files.avatar.filepath);
    });
});



// 文章图片
app.post('/upload/image', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');

    const form = new formidable.IncomingForm({
        encoding: 'utf-8',
        uploadDir: path.join(__dirname, 'public', 'upload'),
        keepExtensions: true
    });
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        // 将客户端传递过来的文件地址响应到客户端
        // res.send({
        //     path: files.attrName.filepath.split('public')[1]
        // });
        res.send(files.image.filepath);
    });
});