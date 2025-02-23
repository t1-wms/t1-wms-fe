import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import WorkItem from './WorkItem';
import { TaskListPageProps } from '../types/tasktypes';
import { useTask } from '../hooks/usetask';
import Spinner from '@/shared/ui/Spinner';

function TaskListPage({ defaultTab = 'inbound' }: TaskListPageProps) {
  const { 
    activeTab, 
    currentTasks, 
    setActiveTab, 
    isLoading, 
    error 
  } = useTask(defaultTab);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <div className="p-4 pb-24">
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          {format(new Date(), 'yyyy년 MM월 dd일 (EEE)', { locale: ko })}
        </p>
      </div>

      <div className="flex mb-6 border-b border-gray-400">
        <button
          className={`py-2 px-4 ${activeTab === 'inbound' ? 'choosetab' : 'text-gray-500'}`}
          onClick={() => setActiveTab('inbound')}
        >
          입하 작업
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'outbound' ? 'choosetab' : 'text-gray-500'}`}
          onClick={() => setActiveTab('outbound')}
        >
          출고 작업
        </button>
      </div>

      <div className="mb-4">
        <span className="text-sm text-gray-500">
          전체 {currentTasks.length}건의 {activeTab === 'inbound' ? '입하' : '출고'} 작업
        </span>
      </div>

      <div className="space-y-4">
        {currentTasks.map((task) => (
          <WorkItem 
            key={task.type === 'inbound' ? task.inboundId : task.outboundId} 
            work={task} 
          />
        ))}
      </div>
    </div>
  );
}

export default TaskListPage;