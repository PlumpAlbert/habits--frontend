import { createFileRoute } from '@tanstack/react-router';
import { TaskList } from '../../components/tasks/list/TaskList';

export const Route = createFileRoute('/tasks/')({
  component: TaskList,
});
