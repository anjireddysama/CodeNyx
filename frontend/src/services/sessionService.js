import { getSessions as getFirestoreSessions } from './dataService';

export const getSessions = async (ngoId = "ngo-123") => {
  return await getFirestoreSessions(ngoId);
};
