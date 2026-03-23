import { Todo } from '../types/todo';

interface TodoAction {
  type: string;
  payload?: any;
}

const initialState: Todo[] = [];
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOOGLE_TODO',
  EDIT_TODO: 'EDIT_TODO',
  DELETE_TODO: 'DELETE_TOD0',
  REORDER_TODOS: 'REORDER_TODOS'
}

export const todoReducer = (state = initialState, action: TodoAction): Todo[] => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...state, action.payload];
    case ACTIONS.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case ACTIONS.EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updatedTodo }
          : todo
      );
    case ACTIONS.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case ACTIONS.REORDER_TODOS:
      const reordered = Array.from(state);
      const [removed] = reordered.splice(action.payload.startIndex, 1);
      reordered.splice(action.payload.endIndex, 0, removed);
      return reordered;
    default:
      return state;
  }
};
