import { ITraining } from "../../../types/store";
import { axiosInstance } from "../../../utils/axios";
import { handleError } from "../auth/authService";

export const getAllTrainings = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  timeframe?: 'upcoming' | 'past' | 'all';
  sort?: 'asc' | 'desc';
}) => {
  try {
    const response = await axiosInstance.get("/api/trainings", { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getTrainingCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/trainings/categories");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUpcomingTrainings = async () => {
  try {
    const response = await axiosInstance.get("/api/trainings/upcoming");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getTrainingById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/trainings/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getTrainingsByCategory = async (category: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/trainings/category/${category}`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const searchTrainings = async (query: string) => {
  try {
    const response = await axiosInstance.get("/api/trainings/search/query", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createTraining = async (data: ITraining) => {
  try {
    const response = await axiosInstance.post("/api/trainings", data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateTraining = async (id: string, data: Partial<ITraining>) => {
  try {
    const response = await axiosInstance.put(`/api/trainings/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteTraining = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/trainings/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getTrainingStats = async () => {
  try {
    const response = await axiosInstance.get("/api/trainings/stats/summary");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};
