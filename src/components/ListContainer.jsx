import DoneList from './DoneList';
import TodoList from './TodoList';
import '../style/common.scss';

export default function ListContainer() {
  return (
    <main>
      <TodoList />
      <DoneList />
    </main>
  );
}
