import { useSelector } from 'react-redux';
import { ReduxState } from 'types/types';

export default function DoneList() {
  const doneList = useSelector((state: ReduxState) => state.todo.list).filter(
    todo => todo.done === true,
  );
  return (
    <section>
      <h3>완료 목록</h3>
      <ul>
        {doneList.map(todo => {
          return (
            <li key={todo.id} className="todoBox fin">
              <span className="text">{todo.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
