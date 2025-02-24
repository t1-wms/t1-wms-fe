// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTaskStore } from '../store/taskstore';
// import { Task, TabType } from '../types/tasktypes';
// import { OutboundTasks } from '../api/worker';

// export const useTask = (defaultTab: TabType = 'inbound') => {
//   const navigate = useNavigate();
//   const { 
//     activeTab, 
//     tasks, 
//     setActiveTab, 
//     setOutboundTasks,
//     isLoading,
//     error 
//   } = useTaskStore();

//   // 초기 탭 설정
//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab, setActiveTab]);

//   // 출고 작업 데이터 로드
//   useEffect(() => {
//     if (activeTab === 'outbound') {
//       const loadOutboundTasks = async () => {
//         try {
//           const outboundTasks = await OutboundTasks();
//           setOutboundTasks(outboundTasks);
//         } catch (error) {
//           console.error('출고 작업 로드 실패:', error);
//         }
//       };
//       loadOutboundTasks();
//     }
//   }, [activeTab, setOutboundTasks]);

//   const handleTaskClick = (task: Task) => {
//     if (task.type === 'inbound') {
//       console.log('입고 작업 시작:', task.inboundId);
//       navigate(`/inbound/inspection/${task.inboundId}`);
//     } else {
//       console.log('출고 작업 시작:', task.outboundId);
//       navigate(`/outbound/location/${task.outboundId}`);
//     }
//   };

//   const currentTasks = activeTab === 'inbound' 
//     ? tasks.inbound 
//     : tasks.outbound;

//   return {
//     activeTab,
//     currentTasks,
//     setActiveTab,
//     handleTaskClick,
//     isLoading,
//     error
//   };
// };

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskstore';
import { Task, TabType, isInboundTask } from '../types/tasktypes';
import { inboundData, outboundData } from '../../../shared/api/mocks';
import { usePickingStore } from '@/pages/outbound/store/outboundstore';
import { useInboundStore } from '@/pages/inbound1/store/inboundstore';

export const useTask = (defaultTab: TabType = 'inbound') => {
  const navigate = useNavigate();
  const { 
    activeTab, 
    tasks, 
    setActiveTab, 
    setInboundTasks,
    setOutboundTasks,
    setLoading,
    isLoading,
    error 
  } = useTaskStore();

  const setPickingList = usePickingStore(state => state.setPickingList);
  const setInboundTask = useInboundStore(state => state.setInboundTask);

  // 초기 탭 설정
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, setActiveTab]);

  // 목데이터 로드
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true); // 로딩 시작
      try {
        if (activeTab === 'inbound') {
          const transformedInboundData = inboundData.map(task => ({
            ...task,
            type: 'inbound' as const
          }));
          setInboundTasks(transformedInboundData);
        } else {
          const transformedOutboundData = outboundData.map(task => ({
            ...task,
            type: 'outbound' as const
          }));
          setOutboundTasks(transformedOutboundData);
        }
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    loadTasks();
  }, [activeTab, setInboundTasks, setOutboundTasks, setLoading]);

  const handleTaskClick = (task: Task) => {
    if (isInboundTask(task)) {
      console.log('입하 작업 시작:', task);
      setInboundTask(task.inboundId); // store 설정 추가
      navigate(`/inbound/inspection/${task.inboundId}`);
    } else {
      console.log('출고 작업 시작:', task);
      setPickingList(task); // 출고 작업 데이터 저장
      navigate('/outbound/location/1'); // 첫 번째 위치 스캔으로 이동
    }
  };

  const currentTasks = activeTab === 'inbound' 
    ? tasks.inbound 
    : tasks.outbound;

  return {
    activeTab,
    currentTasks,
    setActiveTab,
    handleTaskClick,
    isLoading,
    error
  };
};