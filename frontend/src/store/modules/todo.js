const initialState = {
  list: [],
};

const count = initialState.list.length; //3
initialState['nextID'] = count;

// action type에 대한 상수 설정
const CREATE = 'todo/CREATE';
const DONE = 'todo/DONE';
const INIT = 'todo/INIT';

const EDIT = 'todo/EDIT'; // 텍스트 수정

// components에서 사용될 액션 반환 함수
export function create(payload) {
  return {
    type: CREATE,
    payload: payload, // {id:number, text:string}
  };
}
export function done(id) {
  return {
    type: DONE,
    id: id, // id: number
  };
}
// data:{id,text,done}[]
export function init(data) {
  return {
    type: INIT,
    data: data,
  };
}

export function edit(payload) {
  return {
    type: EDIT,
    payload, // { id: number, text: string }
  };
}

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID:
          action.data.length === 0
            ? 1
            : action.data[action.data.length - 1].id + 1,
      };

    case CREATE:
      if (action.payload.text.trim() === '') return state;
      console.log('CREATE 호출됨', action);
      return {
        ...state,
        list: state.list.concat({
          // list의 맨 뒤로 붙여주는 중
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };

    case DONE:
      console.log('DONE 호출됨', action);
      return {
        ...state,
        list: state.list.map(todo => {
          //   console.log('in map', todo); // list.array를 콘솔하는 중
          // 바꾸고자 하는 조건
          if (todo.id === action.id) {
            return {
              ...todo, // done을 제외한 text, id 값을 유지시키기 위한 전개연산
              done: true, // done 값을 덮어쓰기
            };
          } else return todo;
        }),
      };

    case EDIT:
      return {
        ...state,
        list: state.list.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text } // 텍스트 업데이트
            : todo,
        ),
      };

    default:
      return state;
  }
}
