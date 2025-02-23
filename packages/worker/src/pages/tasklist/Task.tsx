import TaskListPage from './ui/TaskListPage';
import { TaskListPageProps } from './types/tasktypes';

function Task({ defaultTab }: TaskListPageProps) {
  return <TaskListPage defaultTab={defaultTab} />;
}

export default Task;