const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// Expose public folder
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static('views'));

function redirect(req, res, next) {
    let datas = [
        req.body["title"],
        req.body["content"],
        req.body["author"]
    ]
    res.redirect('/');
    next();
}

let submittedData = [];

app.get('/', (req, res) => {
    res.render('index', {datas: submittedData});
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.get('/:title', (req, res) => {
    const reqTitle = req.params.title;

    submittedData.forEach((data) => {
        if (data.title === reqTitle) {
            res.render('post.ejs', {title: data.title, content: data.content, author: data.author, date: data.created_at});
        }
    }
    );
});

app.post('/submit', (req, res) => {
    const created_at = moment().format('ll');
    const {title, content, author} = req.body;
    submittedData.push({title, content, author, created_at});

    console.log(JSON.stringify(submittedData));

    res.redirect('/');
});

app.listen(port, (req, res) => {
    console.log(`App is running on port ${port}`);
});