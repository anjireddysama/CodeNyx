import { useQuery } from '@tanstack/react-query';
import { getSessions } from '../services/sessionService';

export const useSessions = (role) => {
  return useQuery({
    queryKey: ['sessions', role],
    queryFn: () => getSessions(role),
  });
};
