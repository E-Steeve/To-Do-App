import { TodoList } from './components/TodoList';

export default function App() {
  return (
    <div className="min-h-screen todo-gradient-bg p-4">
      <div className="container mx-auto py-8">
        <TodoList />
      </div>
    </div>
  );
}