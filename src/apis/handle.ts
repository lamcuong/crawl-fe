const RETRY_INTERVAL = 5000;

export const handleApiRequestWithRetry = async (func: any) => {
  while (true) {
    try {
      const response = await func();

      if (response.data.code === 1008 || response.data.code === 1007) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
        continue;
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const handleApiRequest = async (func: any) => {
  try {
    const response = await func();
    return response.data;
  } catch (error) {
    throw error;
  }
};
