import axios from "axios";

const postGpt = async (chatId: number, userId: number, message: string) => {
  try {
    const requestData = {
      userId: userId,
      message: message,
    };

    const response = await axios.patch(
      `http://${import.meta.env.VITE_BACKEND}:${
        import.meta.env.VITE_PORT
      }/gpt/${chatId}`,
      requestData,
      { withCredentials: true }
    );

    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const fetchGpt = async (chatId: number) => {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_BACKEND}:${
        import.meta.env.VITE_PORT
      }/gpt/${chatId}`,
      { withCredentials: true }
    );

    const chatHistoryData = response.data;
    if (chatHistoryData == undefined) {
      return [];
    }
    return chatHistoryData;
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
};

const createGpt = async (userId: number) => {
  try {
    const requestData = {
      userId: userId,
    };
    console.log(requestData);

    const response = await axios.post(
      `http://${import.meta.env.VITE_BACKEND}:${import.meta.env.VITE_PORT}/gpt`,
      {
        userId: userId,
      }
    );

    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const deleteGpt = async (chatId: number) => {
  try {
    const response = await axios.delete(
      `http://${import.meta.env.VITE_BACKEND}:${
        import.meta.env.VITE_PORT
      }/gpt/${chatId}`
    );
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const fetchGptList = async (userId: number) => {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_BACKEND}:${
        import.meta.env.VITE_PORT
      }/gpt/user/${userId}`
    );
    const userChatList = response.data;
    return userChatList;
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
};

export default { postGpt, fetchGpt, createGpt, deleteGpt, fetchGptList };
