// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import {
  CartItemInterface,
  FetchItemsInterface,
  UpdateCartItemRequestPayloadInterface,
} from "@/utils/interface";
import CartService from "@/api/cart/cart";

export const useCartStore = createWithEqualityFn(
  devtools(
    (set, get) => ({
      cart: [],
      cartItem: {},
      loading: false,
      deleteSuccess: "",
      createCartItem: async (data: CartItemInterface) => {
        set({ loading: true });
        try {
          const response = await CartService.createCartItem(data);

          if (response?.data) {
            if (response?.data?.cart) {
              set({ cartItem: { ...response?.data?.cart } });
            }
            set({ loading: false });
            localStorage.removeItem("cart");
            return response.data;
          }
          set({ loading: false });
        } catch (error: any) {
          return error;
        } finally {
          set({ loading: false });
        }
      },
      fetchCart: async (data: FetchItemsInterface, router: any) => {
        set({ loading: true });
        try {
          const response = await CartService.fetchUserCart(
            data.page_id,
            data.page_size
          );

          if (response?.data) {
            if (response?.data?.cart) {
              set({ cart: [...response?.data?.cart] });
            }
            set({ loading: false });
            return response.data;
          }
          set({ loading: false });
        } catch (error: any) {
          return error;
        } finally {
          set({ loading: false });
        }
      },
      updateCartItemQty: async (
        data: UpdateCartItemRequestPayloadInterface
      ) => {
        set({ loading: true });
        try {
          const response = await CartService.updateCartItemQty(data);

          if (response?.data) {
            if (response?.data?.cart) {
              set({ cartItem: { ...response?.data?.cart } });
            }
            set({ loading: false });
            return response.data;
          }
          set({ loading: false });
        } catch (error: any) {
          return error;
        } finally {
          set({ loading: false });
        }
      },
      removeCartItem: async (data: string) => {
        set({ loading: true });
        try {
          const response = await CartService.removeCartItem(data);

          console.log("response?.data", response?.data);

          if (response?.data) {
            if (response?.data?.message) {
              set({ deleteSuccess: response?.data?.message });
            }
            set({ loading: false });
            return response.data;
          }
          set({ loading: false });
        } catch (error: any) {
          return error;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "cart-storage", // Unique name for the storage
      getStorage: () => localStorage, // Define storage, default is localStorage
    }
  )
);
