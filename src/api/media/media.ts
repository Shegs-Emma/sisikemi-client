import { MediaUploadCloudinaryInterface } from "@/utils/interface";
import { api } from "..";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class MediaService {
  static async uploadImageToCloudinary(
    payload: MediaUploadCloudinaryInterface
  ) {
    return api.post(`${API_URL}upload_image/cloudinary`, payload, {
      withCredentials: true,
    });
  }
}
