const http = require('http');
const express = require('express');
const ejs = require('ejs');

const app = express();
const server = http.createServer(app);

const sqlite3 = require('sqlite3');

app.use(express.json());

// 웹 세팅
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);

app.set('views', './views');
app.use(express.static(`${__dirname}/public`));
app.use('/user', express.static('uploads'));

// https://expressjs.com/ko/guide/routing.html
// https://velog.io/@dongchyeon/Node.js-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EB%B6%84%EB%A6%AC%ED%95%98%EA%B8%B0

const authenticationRoute = require('./app/A_routes/authentication-route'); // 루트 가져오기

app.use('/', authenticationRoute); // 라우팅

server.listen(8000, () => {
  console.log(`Server running at http://localhost:8000/`);
});