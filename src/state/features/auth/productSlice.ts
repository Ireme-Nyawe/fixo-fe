import { axiosInstance } from "../../../utils/axios";
import { handleError } from "./authService";

const getAlllProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/product/");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/category/");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
const getProductsByCategory = async (categoryId: string) => {
  try {
    const response = await axiosInstance.get(`/api/product/${categoryId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const getProductById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/product/view/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const productService = { getAlllProducts, getProductsByCategory,getAllCategories, getProductById };
export default productService;
