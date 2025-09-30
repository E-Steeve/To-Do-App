import { useState, useEffect } from 'react';
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import { TodoFilter, type FilterType } from './TodoFilter';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { CheckCheck, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = 'todo-list';

export function TodoList() {
  // Load todos from localStorage or use default tasks
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
          return JSON.parse(savedTodos);
        }
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
    // Default tasks if no saved data
    return [
      { id: '1', text: 'Hello!', completed: true },
      { id: '2', text: 'This is a To-Do App.', completed: false },
      { id: '3', text: 'Now you can organize and manage yours tasks.', completed: false },
    ];
  });
  
  const [filter, setFilter] = useState<FilterType>('all');

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const markAllComplete = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const taskCounts = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  };

  return (
    <Card className="w-full max-w-2xl mx-auto todo-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCheck className="h-6 w-6" />
            To Do List
          </CardTitle>
          <p className="text-sm text-muted-foreground">By Steeve Edoh</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <AddTodo onAdd={addTodo} />
        
        <div className="flex items-center justify-between">
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
          
          {todos.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllComplete}
                className="gap-2"
              >
                <CheckCheck className="h-4 w-4" />
                {todos.every(todo => todo.completed) ? 'Unmark All' : 'Mark All'}
              </Button>
              
              {taskCounts.completed > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Completed
                </Button>
              )}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {filter === 'all' && todos.length === 0 && "No tasks yet. Add one above!"}
              {filter === 'active' && taskCounts.active === 0 && "No active tasks!"}
              {filter === 'completed' && taskCounts.completed === 0 && "No completed tasks yet."}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            {taskCounts.active} of {taskCounts.all} tasks remaining
          </div>
        )}
      </CardContent>
    </Card>
  );
}