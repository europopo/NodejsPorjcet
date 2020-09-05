const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // 添加消息解析器
const Article = require('./db').Article;

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // 添加編碼為JSON的請求消息體
app.use(bodyParser.urlencoded({extended: true})); // 添加編碼為表單的請求消息體

app.get('/articles', (req,res,next)=>{
    res.send(articles);
});

app.post('/articles', (req,res,next)=>{
    res.send('ok');
});

app.get('/articles/:id', (req,res,next)=>{
    const id = req.params.id;
    console.log('Fetching:',id);
    res.send(articles[id]);
});

app.delete('/articles/:id', (req,res,next)=>{
    const id = req.params.id;
    console.log('Deleting:',id);
    delete articles[id];
    res.send({message: 'Deleted'});
});

app.listen(port,()=>{
    console.log(`Express web app available at localhost:${port}`);
    console.log(`http://localhost:${port}`);
});

module.exports = app;
