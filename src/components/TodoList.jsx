import { faCheck, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { create, done, edit } from '../store/modules/todo';
import { useEffect, useRef, useState } from 'react';

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

  // 수정하기

  const [editingId, setEditingId] = useState(null); // 수정 중인 todo의 ID
  const [editingText, setEditingText] = useState(''); // 수정 중인 텍스트

  const startEditing = (id, text) => {
    setEditingId(id); // 수정 상태 활성화
    setEditingText(text); // 기존 텍스트를 input에 표시
  };

  const cancelEditing = () => {
    setEditingId(null); // 수정 상태 비활성화
    setEditingText(''); // 수정 텍스트 초기화
  };

  const saveEditing = id => {
    dispatch(edit({ id, text: editingText })); // 수정된 텍스트 저장
    cancelEditing(); // 수정 상태 종료
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
            <button onClick={createTodo}>추가</button>{' '}
          </div>
        </div>

        <h3>할 일 목록</h3>
        <ul>
          {todoList.map(todo => (
            <li key={todo.id} className="todoBox yet">
              {editingId === todo.id ? (
                // 수정 중일 때
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                  />
                  <button onClick={() => saveEditing(todo.id)}>
                    수정 완료
                  </button>
                  <button onClick={cancelEditing}>수정 닫기</button>
                </>
              ) : (
                // 기본 상태
                <>
                  <button onClick={() => dispatch(done(todo.id))}>
                    <FontAwesomeIcon icon={faCheck} className="icon-check" />
                  </button>
                  <span className="text">{todo.text}</span>
                  <button
                    className="editBtn"
                    onClick={() => startEditing(todo.id, todo.text)}
                  >
                    수정
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
