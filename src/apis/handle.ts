export const handleApiRequestWithMessage = async (func: any) => {
  try {
    const response = await func();
    if (response.data.code === 1008 || response.data.code === 1007) {
      throw response.data.message;
    }
    return response.data;
  } catch (error) {
    throw error;
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
