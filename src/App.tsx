import React from 'react';
import { Stack } from 'office-ui-fabric-react';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { Store, FilterTypes } from './store';

let index = 0;

export default class TodoApp extends React.Component<any, Store> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: {
        id0: { label: 'hello', completed: false },
        id1: { label: 'world', completed: false }
      },
      filter: 'all'
    };
  }
  render() {
    const { filter, todos } = this.state;
    return (
      <Stack horizontalAlign="center">
        <Stack style={{ width: 400 }} gap={25}>
          <TodoHeader addTodo={this._addTodo} setFilter={this._setFilter} filter={filter} />
          <TodoList complete={this._complete} todos={todos} filter={filter} remove={this._remove} edit={this._edit} />
          <TodoFooter clear={this._clear} todos={todos} />
        </Stack>
      </Stack>
    );
  }

  private _addTodo = (label: any) => {
    const { todos } = this.state;
    const id = index++;

    this.setState({
      todos: { ...todos, [id]: { label } }
    });
  };

  private _remove = (id: string | number) => {
    const newTodos = { ...this.state.todos };
    delete newTodos[id];

    this.setState({
      todos: newTodos
    });
  };

  private _complete = (id: string | number) => {
    const newTodos = { ...this.state.todos };
    newTodos[id].completed = !newTodos[id].completed;

    this.setState({
      todos: newTodos
    });
  };

  private _edit = (id: string | number, label: any) => {
    const newTodos = { ...this.state.todos };
    newTodos[id] = { ...newTodos[id], label };

    this.setState({
      todos: newTodos
    });
  };

  private _clear = () => {
    const { todos } = this.state;
    const newTodos = {};

    Object.keys(this.state.todos).forEach(id => {
      if (!todos[id].completed) {
        newTodos[id] = todos[id];
      }
    });

    this.setState({
      todos: newTodos
    });
  };

  private _setFilter = (filter: FilterTypes) => {
    this.setState({
      filter: filter
    });
  };
}
