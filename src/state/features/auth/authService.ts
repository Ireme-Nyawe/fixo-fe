import { IUser } from "../../../types/store";
import { axiosInstance } from "../../../utils/axios";



export const handleError = (error: any) => {
  if (error.response) {
    return {
      status: error.response.status,
      message:
        error.response.data.message ||
        "Something went wrong. Please try again.",
    };
  }
  return {
    status: 500,
    message: error.message || "Unexpected error occurred. Please try again.",
  };
};

const login = async (userData: IUser) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", userData);
    return response.data;

  } catch (error) {
    return handleError(error);
  }
};

const verifyOTP = async (data: any) => {
  try {
    const response = await axiosInstance.post("/api/auth/verify-otp", data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/view-profile")
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

const updateProfile = async (data: IUser) => {
  try {
    const response = await axiosInstance.put("/api/auth/update-profile", data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

const authService = {
  login,
  verifyOTP,
  getProfile,
  updateProfile
};

export default authService;
