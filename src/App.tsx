import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { TaskCreatePage } from './pages/tasks/create';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskCreatePage />
    </QueryClientProvider>
  );
}

export default App;
