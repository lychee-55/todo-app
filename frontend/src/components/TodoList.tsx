import {
  faCheck,
  faPenToSquare,
  faSeedling,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { create, del, done, update } from '../store/modules/todo';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ReduxState, Todo } from 'types/types';

export default function TodoList() {
  // useSelector()를 통해서 store의 state를 가져올 수 있음.
  let todoList = useSelector((state: ReduxState) => state.todo.list); // store.todo는 store/index.js의 combineReducers 첫번째 객체값 todo
  //   console.log(todoList); // Object, List의 배열
  todoList = todoList.filter((todo: Todo) => todo.done === false);

  const nextID = useSelector((state: ReduxState) => state.todo.nextID);
  // action을 전달하기 위해서, useDispatch()통해 디스패치 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null); // 태그를 선택하는 중

  // console.log('nextID>>', nextID);
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };
  /* 할 일 추가 POST /todo */
  const createTodo = async () => {
    if (inputRef.current && inputRef.current.value.trim() !== '') {
      // state를 변경해서 화면을 바꾸는 것 = dispatch
      dispatch(create({ id: nextID, text: inputRef.current.value }));
    }

    // DB 정보를 바꾸기 위해서 axios 요청
    await axios.post(`${process.env.REACT_APP_API_SERVER}/todo`, {
      text: inputRef.current?.value,
    });
    clearInput();
  };

  /* todo의 상태 변경 PATCH /todo/:todoId */
  const toDone = async (id: number) => {
    // state를 변경해서 화면을 바꾸는 것
    dispatch(done(id));

    // DB 정보를 바꾸기 위해 axios 요청
    await axios.patch(`${process.env.REACT_APP_API_SERVER}/todo/${id}`);
  };

  const enterTodo = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') createTodo();
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // todo 삭제 DELETE /todo/:todoId
  const deleteTodo = async (todoId: number) => {
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/todo/${todoId}`);

    dispatch(del(todoId));
  };

  // todo 수정
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const getTodo = (todoId: number) => {
    // 1. 수정 모드로 변경하여 버튼모양 변경
    // 2. 수정하고 싶은 text값 input value로 넣어주기
    setIsUpdateMode(true); // 수정 모드로 변경

    const [todo] = todoList.filter(to => to.id === todoId); // [{}]으로 받기 때문에 앞에 구조분해할당을 넣어서 {}만 가져옴
    console.log('todo', todo); //{id: , text: '', done: }
    if (inputRef.current) inputRef.current.value = todo.text;
    setUpdateId(todoId);
  };

  const cancelUpdate = () => {
    setIsUpdateMode(false);
    clearInput();
  };

  const updateTodo = async () => {
    const inputValue = inputRef.current?.value as string;

    // DB data 변경
    const res = await axios.patch(
      `${process.env.REACT_APP_API_SERVER}/content`,
      {
        id: updateId,
        text: inputValue,
      },
    );

    console.log(res.data); // {isSuccess: true||false}
    if (res.data.isSuccess) {
      cancelUpdate();
    }

    // 프론트 즉시 반영
    dispatch(update(updateId, inputValue));
  };

  return (
    <>
      <section>
        <div className="background-section">
          <h1>
            <FontAwesomeIcon icon={faSeedling} /> 오늘의 할 일은 무엇인가요?
          </h1>
          <div>
            <input
              type="text"
              ref={inputRef}
              onKeyDown={enterTodo}
              placeholder="할 일을 작성해주세요"
            />
            {'  '}
            {isUpdateMode ? (
              <>
                <button onClick={updateTodo}>수정</button>
                <button onClick={cancelUpdate}>취소</button>
              </>
            ) : (
              <button onClick={createTodo}>추가</button>
            )}
          </div>
        </div>

        <h3>할 일 목록</h3>
        <ul>
          {todoList.map(todo => {
            return (
              <li key={todo.id} className="todoBox yet">
                <button onClick={() => toDone(todo.id)}>
                  <FontAwesomeIcon icon={faCheck} className="icon-check" />
                </button>{' '}
                <span>{todo.text}</span>{' '}
                <button onClick={() => getTodo(todo.id)}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="icon-check"
                  />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <FontAwesomeIcon icon={faTrashCan} className="icon-check" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
