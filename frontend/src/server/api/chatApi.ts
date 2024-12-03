import axios from "../axiosInstance";

export const postPrompt = async (message: string) => {
  try {
    const response = await axios.post("/chat", {
      message,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error posting prompt:", error);
    return null;
  }
};
