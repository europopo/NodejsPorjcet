const sqlite3 = require('sqlite3').verbose();
const dbName = 'later.sqlite';
const db = new sqlite3.Database(dbName);

db.serialize(()=>{
    const sql = `CREATE TABLE IF NOT EXISTS articles 
         (id INTEGER PRIMARY KEY AUTOINCREMENT, url varchar(200), title, content TEXT)`;
    //const sql = 'drop table articles';
    // const sql = 'alter table articles MODIFY COLUMN id INTEGER PRIMARY KEY AUTOINCREMENT'
        db.run(sql);
});

class Article {
    static all(cb) {
        db.all('select * from articles', cb);
    }

    static find(id, cb) {
        db.get('select * from articles where id = ?', id, cb);
    }

    static create(data, cb) {
        const sql = 'insert into articles(url,title,content) values(?,?,?)';
        db.run(sql,data.url,data.title, data.content, cb);
    }

    static delete(id, cb) {
        if (!id) return cb(new Error('please provide an id'));
        db.run('delete from articles where id = ?', id, cb);
    }
}

module.exports = db;
module.exports.Article = Article;
