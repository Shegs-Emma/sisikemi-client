import { CreateOrderPayloadInterface } from "@/utils/interface";
import { api } from "..";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class OrderService {
  static async fetchOrders(page_id: string, page_size: string) {
    return api.get(
      `${API_URL}list_orders?page_id=${page_id}&page_size=${page_size}`,
      {
        withCredentials: true,
      }
    );
  }

  static async createOrder(payload: CreateOrderPayloadInterface) {
    return api.post(`${API_URL}create_order`, payload, {
      withCredentials: true,
    });
  }
}
