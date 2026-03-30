// Mock API utility function
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockFetch = async (data, shouldFail = false) => {
  await delay(500); // simulate network latency
  if (shouldFail) throw new Error("Mock API request failed");
  return data;
};
