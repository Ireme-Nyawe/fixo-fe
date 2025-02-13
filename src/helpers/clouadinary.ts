import { toast } from "sonner";
import axios from 'axios';

/**
 * Upload a file to Cloudinary.
 *
 * @param file - The file to upload.
 * @param options - Optional parameters for customization.
 * @param options.uploadPreset - Cloudinary upload preset (default: 'gishoma.rw').
 * @param options.folder - Cloudinary folder where the file will be stored.
 * @param options.resourceType - The type of file (default: 'auto' for images, videos, etc.).
 * @returns The URL of the uploaded file or null on failure.
 */
export const uploadToCloudinary = async (
    file: File,
    options: {
        uploadPreset?: string;
        folder?: string;
        resourceType?: string;
    } = {}
): Promise<string | null> => {
    const { uploadPreset = 'gishoma.rw', folder, resourceType = 'auto' } = options;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    if (folder) formData.append('folder', folder);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dcwchdco1/${resourceType}/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Failed to upload file');
        return null;
    }
};
