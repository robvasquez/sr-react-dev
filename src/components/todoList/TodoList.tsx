import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "../../store/store";
import {fetchTodos} from "../../features/todos/todosSlice";
const { useEffect, useCallback, useMemo, useState } = React;

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);
  const [todoIdSelected, setTodoIdSelected] = useState<number>(-1);

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchTodos(abortController.signal));

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  // useMemo example (just for demonstration)
  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  // useCallback example (just for demonstration)
  const handleTodoClick = useCallback((todoId: number) => {
    setTodoIdSelected(todoId);
    console.log(`Clicked todo with id: ${todoId}`);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <h1>Click the ToDo item</h1>
        {todoIdSelected > -1 && <p>TodoItem Id {todoIdSelected}</p>}
      </div>
      <div>-----------------------</div>
      <ul>
        {completedTodos.map(todo => (
          <li key={todo.id} onClick={() => handleTodoClick(todo.id)}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>

  );
};

export default TodoList;
