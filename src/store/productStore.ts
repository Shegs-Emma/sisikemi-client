// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import {
  CreateProductRequestInterface,
  FetchItemsInterface,
  UpdateProductStatusPayload,
} from "@/utils/interface";
import ProductService from "@/api/products/product";

export const useProductStore = createWithEqualityFn(
  devtools(
    (set) => ({
      products: [],
      product: {},
      updatedProduct: {},
      loading: false,
      createProduct: async (data: CreateProductRequestInterface) => {
        set({ loading: true });
        try {
          const response = await ProductService.createProduct(data);

          if (response?.data) {
            if (response?.data?.product) {
              set({ product: { ...response?.data?.product } });
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
      fetchProducts: async (data: FetchItemsInterface) => {
        set({ loading: true });
        try {
          const response = await ProductService.fetchProducts(
            data.page_id,
            data.page_size
          );

          if (response?.data) {
            if (response?.data?.product) {
              set({ products: [...response?.data?.product] });
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
      getProduct: async (id: string) => {
        set({ loading: true });
        try {
          const response = await ProductService.getProduct(id);

          if (response?.data) {
            if (response?.data?.product) {
              set({ product: { ...response?.data?.product } });
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
      updateProduct: async (data: UpdateProductStatusPayload) => {
        set({ loading: true });
        try {
          const response = await ProductService.updateProductStatus(data);

          if (response?.data) {
            if (response?.data?.product) {
              set({ updatedProduct: { ...response?.data?.product } });
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
      deleteProduct: async (id: number) => {
        set({ loading: true });
        try {
          const response = await ProductService.deleteProduct(id);

          if (response?.data?.message) {
            set({ loading: false });
            return response?.data?.message;
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
      name: "product-storage", // Unique name for the storage
      getStorage: () => localStorage, // Define storage, default is localStorage
    }
  )
);
