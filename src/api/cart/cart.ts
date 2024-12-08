import {
  CartItemInterface,
  UpdateCartItemRequestPayloadInterface,
} from "@/utils/interface";
import { api } from "..";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class CartService {
  static async createCartItem(payload: CartItemInterface) {
    return api.post(`${API_URL}create_cart_item`, payload, {
      withCredentials: true,
    });
  }

  static async fetchUserCart(page_id: string, page_size: string) {
    return api.get(
      `${API_URL}list_user_cart?page_id=${page_id}&page_size=${page_size}`,
      {
        withCredentials: true,
      }
    );
  }

  static async updateCartItemQty(
    payload: UpdateCartItemRequestPayloadInterface
  ) {
    return api.patch(`${API_URL}update_cart_item_qty`, payload, {
      withCredentials: true,
    });
  }

  static async removeCartItem(product_id: string) {
    return api.delete(`${API_URL}delete_cart_item/${product_id}`, {
      withCredentials: true,
    });
  }
}
