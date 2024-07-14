import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  tag: string;
}

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [
    { id: '1', title: 'Study', completed: false, tag: 'Tag' },
    { id: '2', title: 'Take out the garbage', completed: false, tag: 'Tag' },
    { id: '3', title: 'Go to the gym', completed: false, tag: 'Tag' },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        state.todos = [
          ...state.todos.filter(todo => !todo.completed),
          ...state.todos.filter(todo => todo.completed),
        ];
      }
    },
    reorderTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, completeTodo, reorderTodos, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
