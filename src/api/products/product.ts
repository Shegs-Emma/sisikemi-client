import {
  CreateProductRequestInterface,
  UpdateProductStatusPayload,
} from "@/utils/interface";
import { api } from "..";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class ProductService {
  static async createProduct(payload: CreateProductRequestInterface) {
    return api.post(`${API_URL}create_product`, payload, {
      withCredentials: true,
    });
  }

  static async fetchProducts(page_id: string, page_size: string) {
    return api.get(
      `${API_URL}list_product?page_id=${page_id}&page_size=${page_size}`,
      {
        withCredentials: true,
      }
    );
  }

  static async getProduct(id: string) {
    return api.get(`${API_URL}product/${id}`, {
      withCredentials: true,
    });
  }

  static async updateProductStatus(payload: UpdateProductStatusPayload) {
    return api.patch(`${API_URL}update_product`, payload, {
      withCredentials: true,
    });
  }

  static async deleteProduct(id: number) {
    return api.delete(`${API_URL}delete_product/${id}`, {
      withCredentials: true,
    });
  }
}
