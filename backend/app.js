const express = require('express');
const app = express();
const PORT = 8080;
const { sequelize } = require('./models'); //sequelize를 통해서 sync를 해줌줌
const serverPerfix = '/api-server'; // 서버의 접두사를 이렇게 선언
const indexRouter = require('./routes');
const cors = require('cors'); // 서로 다른 서버에서 데이터를 주고 받기 위해 작성 ==> cors에러 고치기

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// 클라이언트에서 페이징하는 경로랑 서버에서 페이징하는 PORT가 다름.
// /api-server ===> "/"  api요청 보내는 url
app.use(serverPerfix, indexRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('database sync 연결 성공!!');
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
    console.log('database sync오류!!');
  });
