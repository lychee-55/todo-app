const { where } = require('sequelize');
const { Todo, sequelize } = require('../models');
///// test API /////
exports.getIndex = (req, res) => {
  res.send('response from api-server: [GET /api-server]');
};

exports.getUser = (req, res) => {
  res.send('response from api-server: [GET /api-server/user]');
};

///// todo API 작성 /////
// 전체 조회  GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll();
    console.log(todoAll);

    res.send(todoAll);
  } catch (err) {
    console.log('server error', err);
    res.status(500).send('서버에러..관리자에게 문의하세요!');
  }
};

// todo 하나 추가  POST /api-server/todo
// req.body로 text 받을 예정
exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    await Todo.create({
      text: text, // 키 값과 같으면 생략 가능
    });

    res.send({ isSuccess: true });
  } catch (err) {
    console.log('server error', err);
    res.status(500).send('서버에러..관리자에게 문의하세요!');
  }
};

// todo.done값 변경  PATCH /api-server/todo/:todoId
// req.params로 id 받을 예정
exports.patchDoneState = async (req, res) => {
  try {
    const { todoId } = req.params;
    const [isUpdated] = await Todo.update(
      { done: sequelize.literal('NOT done') }, // 바꿀 값, 컬럼명: 명령어
      { where: { id: todoId } }, // 찾을 조건,
    );

    // update는 배열로, delete는 숫자0, 1로 값이 들어옴.
    // [0],[1]
    Boolean(isUpdated)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false }); // 잘못된(없는) todoId 수정 시도를 보내는 경우
  } catch (err) {
    console.log('server error', err);
    res.status(500).send('서버에러..관리자에게 문의하세요!');
  }
};

/* 실습문제 */
// 수정, 삭제에 대한 API
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const isDeleted = await Todo.destroy({ where: { id: todoId } });
    Boolean(isDeleted)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false });
  } catch (err) {
    console.log('server err!', err);
    res.status(500).send('Server Err!!');
  }
};

exports.patchContent = async (req, res) => {
  // {id,text} = req.body
  try {
    const { id, text } = req.body;
    const [isUpdated] = await Todo.update(
      { text: text },
      { where: { id: id } },
    );
    Boolean(isUpdated)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false });
  } catch (err) {
    console.log('server!err!', err);
    res.status(500).send('SERBER ERROR!');
  }
};
