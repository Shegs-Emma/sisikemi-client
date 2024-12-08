import { MediaUploadInterface } from "@/utils/interface";
import { api } from "..";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class MediaService {
  static async uploadImage(payload: MediaUploadInterface) {
    return api.post(`${API_URL}upload_image`, payload, {
      withCredentials: true,
    });
  }
}
