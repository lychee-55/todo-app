import { faCheck, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { create, done } from '../store/modules/todo';
import { useEffect, useRef } from 'react';

export default function TodoList() {
  // useSelector()를 통해서 store의 state를 가져올 수 있음.
  let todoList = useSelector(state => state.todo.list); // store.todo는 store/index.js의 combineReducers 첫번째 객체값 todo
  //   console.log(todoList); // Object, List의 배열
  todoList = todoList.filter(todo => todo.done === false);

  // action을 전달하기 위해서, useDispatch()통해 디스패치 함수 생성
  const dispatch = useDispatch();

  const inputRef = useRef(); // 태그를 선택하는 중

  const nextID = useSelector(state => state.todo.nextID);
  console.log('nextID>>', nextID);

  const createTodo = () => {
    dispatch(create({ id: nextID, text: inputRef.current.value }));
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const enterTodo = e => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') createTodo();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
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
          <button onClick={createTodo}>추가</button>{' '}
        </div>
      </div>
      <section>
        <h3>할 일 목록</h3>
        <ul>
          {todoList.map(todo => {
            return (
              <li key={todo.id} className="todoBox yet">
                <button onClick={() => dispatch(done(todo.id))}>
                  <FontAwesomeIcon icon={faCheck} className="icon-check" />
                </button>{' '}
                <span className="text">{todo.text}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
