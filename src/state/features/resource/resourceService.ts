import { IResource, IResourceContent } from "../../../types/store";
import { axiosInstance } from "../../../utils/axios";
import { handleError } from "../auth/authService";

// PUBLIC ENDPOINTS
export const getAllResources = async () => {
  try {
    const response = await axiosInstance.get("/api/resources");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getResourceById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/resources/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getResourceFull = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/resources/${id}/full`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getResourceBySlug = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/api/resources/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getResourceContent = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/resources/${id}/content`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getResourcesByCategory = async (category: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/resources/category/${category}`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getResourcesByTag = async (tag: string) => {
  try {
    const response = await axiosInstance.get(`/api/resources/tag/${tag}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const searchResources = async (query: string) => {
  try {
    const response = await axiosInstance.get("/api/resources/search/query", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// PROTECTED ENDPOINTS
export const createResource = async (data: IResource) => {
  try {
    const response = await axiosInstance.post("/api/resources", data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateResource = async (id: string, data: Partial<IResource>) => {
  try {
    const response = await axiosInstance.put(`/api/resources/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteResource = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/resources/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getUserResources = async () => {
  try {
    const response = await axiosInstance.get("/api/resources/my-resources");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// RESOURCE CONTENT ENDPOINTS
export const addResourceContent = async (
  resourceId: string,
  data: IResourceContent
) => {
  try {
    const response = await axiosInstance.post(
      `/api/resources/${resourceId}/content`,
      data
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateResourceContent = async (
  resourceId: string,
  contentId: string,
  data: Partial<IResourceContent>
) => {
  try {
    const response = await axiosInstance.put(
      `/api/resources/${resourceId}/content/${contentId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteResourceContent = async (
  resourceId: string,
  contentId: string
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/resources/${resourceId}/content/${contentId}`
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};
