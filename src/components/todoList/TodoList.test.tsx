import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import TodoList from "./TodoList";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";  // if using thunks

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const mockTodos = [
  { id: 1, title: 'Todo 1', completed: true },
  { id: 2, title: 'Todo 2', completed: false },
  { id: 3, title: 'Todo 3', completed: true },
];

describe('<TodoList />', () => {

  it('displays "Loading..." when loading', () => {
    const store = mockStore({
      todos: { todos: [], loading: true, error: null }
    });

    const { getByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('displays an error message when there is an error', () => {
    const store = mockStore({
      todos: { todos: [], loading: false, error: 'Error loading todos' }
    });

    const { getByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(getByText('Error: Error loading todos')).toBeTruthy();
  });

  it('renders only completed todos', () => {
    const store = mockStore({
      todos: { todos: mockTodos, loading: false, error: null }
    });

    const { queryByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(queryByText('Todo 1')).toBeTruthy();
    expect(queryByText('Todo 2')).toBeNull();
    expect(queryByText('Todo 3')).toBeTruthy();
  });

  it('updates selected todo ID on todo click', () => {
    const store = mockStore({
      todos: { todos: mockTodos, loading: false, error: null }
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const todoItem = getByText('Todo 1');
    fireEvent.click(todoItem);
    expect(queryByText('TodoItem Id 1')).toBeTruthy();
  });

});
