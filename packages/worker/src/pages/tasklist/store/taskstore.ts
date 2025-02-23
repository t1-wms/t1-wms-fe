import { create } from 'zustand';
import { Task, TabType } from '../types/tasktypes';

interface TaskStore {
  activeTab: TabType;
  tasks: {
    inbound: Task[];
    outbound: Task[];
  };
  isLoading: boolean;
  error: string | null;
  setActiveTab: (tab: TabType) => void;
  setInboundTasks: (tasks: Task[]) => void;
  setOutboundTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void; 
}

export const useTaskStore = create<TaskStore>((set) => ({
  activeTab: 'inbound',
  tasks: {
    inbound: [],
    outbound: []
  },
  isLoading: false,
  error: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setInboundTasks: (inboundTasks) => 
    set((state) => ({
      tasks: {
        ...state.tasks,
        inbound: inboundTasks
      }
    })),
  setOutboundTasks: (outboundTasks) => 
    set((state) => ({
      tasks: {
        ...state.tasks,
        outbound: outboundTasks
      }
    })),
    setLoading: (loading) => set({ isLoading: loading })
}));