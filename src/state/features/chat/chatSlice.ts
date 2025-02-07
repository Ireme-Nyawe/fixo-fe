import { IMessage, IProduct, IProductCategory } from "../../../types/store";
import { axiosInstance } from "../../../utils/axios";
import { handleError } from "../auth/authService";

const getUsersForChat = async () => {
    try {
        const response = await axiosInstance.get("/api/messages/chats");
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}
const getChatMessages = async (receiverId:string) => {
    try {
        const response = await axiosInstance.get(`/api/messages/${receiverId}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

const sendMessage = async (data: IMessage) => {
    try {
        const response = await axiosInstance.post("/api/messages/new", data);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export default {getUsersForChat, getChatMessages, sendMessage}
