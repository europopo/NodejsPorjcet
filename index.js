const read = require('node-readability');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // 添加消息解析器
const Article = require('./db').Article;

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // 添加編碼為JSON的請求消息體
app.use(bodyParser.urlencoded({extended: true})); // 添加編碼為表單的請求消息體

app.get('/articles', (req,res,next)=>{
    Article.all((err, articles)=>{
        if (err) return next(err);
        res.send(articles);
    });
});

app.get('/articles/:id', (req,res,next)=>{
    const id = req.params.id;
    Article.find(id, (err, article)=>{
        if (err) return next(err);
        res.send(articles[id]);
    })
    
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
app.delete('/articles/:id', (req,res,next)=>{
    const id = req.params.id;
    Article.delete(id, (err)=>{
        if (err) return next(err);
        res.send({message: 'Deleted'});
    });
});

app.post('/articles', (req, res, next)=>{
    const url = req.body.url;

    read(url, (err, result)=>{
        if (err || !result) res.status(500).send('Error downloading article');
        Article.create(
            {title: result.title, content: result.content},
            (err, article)=>{
                if (err) return next(err);
                res.send('ok');
            }
        );
    });
});

app.listen(port,()=>{
    console.log(`Express web app available at localhost:${port}`);
    console.log(`http://localhost:${port}`);
});

module.exports = app;
