// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import {
  CreateOrderPayloadInterface,
  FetchItemsInterface,
} from "@/utils/interface";
import OrderService from "@/api/orders/orders";

export const useOrderStore = createWithEqualityFn(
  devtools(
    (set) => ({
      orders: [],
      order: {},
      loading: false,
      fetchOrders: async (data: FetchItemsInterface) => {
        set({ loading: true });
        try {
          const response = await OrderService.fetchOrders(
            data.page_id,
            data.page_size
          );

          if (response?.data) {
            if (response?.data?.orders) {
              set({ orders: [...response?.data?.orders] });
            }
            set({ loading: false });
            return response.data;
          }
          set({ loading: false });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error;
        } finally {
          set({ loading: false });
        }
      },
      createOrder: async (data: CreateOrderPayloadInterface) => {
        set({ loading: true });
        try {
          const response = await OrderService.createOrder(data);

          if (response?.data) {
            if (response?.data?.order) {
              set({ order: { ...response?.data?.order } });
            }
            set({ loading: false });
            return response.data;
          }
          set({ loading: false });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return error;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "order-storage", // Unique name for the storage
      getStorage: () => localStorage, // Define storage, default is localStorage
    }
  )
);
