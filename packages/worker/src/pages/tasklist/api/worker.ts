import client from '@/shared/api/client';
import { OutboundTask } from '@/pages/tasklist/types/tasktypes';

export const OutboundTasks = async (): Promise<OutboundTask[]> => {
  const response = await client.get('worker/outbound');
  return response.data;
};