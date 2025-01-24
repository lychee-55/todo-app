import Header from './components/Header';
import ListContainer from './components/ListContainer';

function App() {
  // console.log(process.env.REACT_APP_API_SERVER); server가 잘 불러오고 있는지 확인
  return (
    <div className="App">
      <Header />
      <ListContainer />
    </div>
  );
}

export default App;
