import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite from 'sqlite3';
import fs from 'fs';
//import https from 'https';
/*
const options = {
    key: fs.readFileSync('./comi.kro.kr/private.key'),
    cert: fs.readFileSync('./comi.kro.kr/certificate.crt')
}; 
*/

const db = new sqlite.Database('./db/post.db', err=>{
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected db');
});
const tableName = "POST";
//DB Initializing
db.run(`CREATE TABLE IF NOT EXISTS ${tableName}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pageUrl TEXT,
    txt TEXT,
    x INTEGER,
    y INTEGER,
    date TEXT
)`)


const app = express();
const PORT = 80;

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.post('/comments/', (req, res) => {
    
    db.run(`INSERT INTO ${tableName} (pageUrl, txt, x, y,date) VALUES (
        "${req.body.pageUrl}", 
        "${req.body.txt}", 
        ${req.body.x}, 
        ${req.body.y},
        ${req.body.date}
    )`)
});


class sqlType {
    public txt : string;
    public x : number;
    public y : number;
    public date : string;
}

app.post('/getpost/', (req, res) =>{
    let url = req.body.pageUrl;
    let result:sqlType[] = [];
    db.all(`SELECT txt,x,y FROM ${tableName} WHERE pageUrl = "${url}"`, (err,rows) =>{
        if(err) return;
        rows.forEach(row => {
            result.push({
                txt: row["txt"],
                x: row["x"],
                y: row["y"],
                date: row["date"]
            });
        })
        res.json({
            data: result
        })
    })


});

//const server = https.createServer(options, app);
//server.listen(PORT);

app.listen(PORT);
