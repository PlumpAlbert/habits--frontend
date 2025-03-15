import { createFileRoute } from '@tanstack/react-router';
import { TaskCreatePage } from '../../components/tasks/create';

export const Route = createFileRoute('/tasks/create')({
  component: TaskCreatePage,
});
