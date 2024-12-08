import { CreateCollectionInterface } from "@/utils/interface";
import { api } from "..";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class CollectionService {
  static async createCollection(payload: CreateCollectionInterface) {
    return api.post(`${API_URL}create_collection`, payload, {
      withCredentials: true,
    });
  }

  static async fetchCollections(page_id: string, page_size: string) {
    return api.get(
      `${API_URL}list_collection?page_id=${page_id}&page_size=${page_size}`,
      {
        withCredentials: true,
      }
    );
  }
}
