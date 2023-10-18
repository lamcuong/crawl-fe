
export const handleApiRequest = async (func: any) => {
  try {
    const response = await func();
    return response.data;
  } catch (error) {
    throw error;
  }
};
