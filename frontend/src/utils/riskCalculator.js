// Mock utility for progress/risk
export const calculateRiskLevel = (attendanceRate, testScores) => {
  const avg = (attendanceRate + testScores) / 2;
  if(avg > 80) return 'Green';
  if(avg > 50) return 'Yellow';
  return 'Red';
};
