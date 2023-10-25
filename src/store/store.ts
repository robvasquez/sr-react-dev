// store.ts
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;

// Enhance the dispatch type with thunk middleware
export type AppDispatch = typeof store.dispatch & {
  <ReturnType = void, State = RootState, ExtraArg = unknown>(
    action: ThunkAction<ReturnType, State, ExtraArg, Action<string>>
  ): ReturnType;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;

export default store;
