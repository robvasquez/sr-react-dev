import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AppThunk} from "../../store/store";

// Define the Todo and the initial state types
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

// Use createSlice to generate the reducer and actions
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosStart(state) {
      state.loading = true;
      state.error = null;
    },
    getTodosSuccess(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
      state.loading = false;
    },
    getTodosFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const { getTodosStart, getTodosSuccess, getTodosFailure } = todosSlice.actions;

// Thunk action to fetch todos
export const fetchTodos = (signal: AbortSignal): AppThunk => async (dispatch) => {
  try {
    dispatch(getTodosStart());
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', { signal }); // Add the signal to the fetch call
    const data: Todo[] = await response.json();
    dispatch(getTodosSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      if (error.name !== 'AbortError') {
        dispatch(getTodosFailure(error.message));
      }
    }
  }
};

// Export reducer
export default todosSlice.reducer;
