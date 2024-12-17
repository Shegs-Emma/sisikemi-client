// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import {
  CreateCollectionInterface,
  FetchItemsInterface,
} from "@/utils/interface";
import CollectionService from "@/api/collections/collection";

export const useCollectionStore = createWithEqualityFn(
  devtools(
    (set) => ({
      collections: [],
      collection: {},
      loading: false,
      createCollection: async (data: CreateCollectionInterface) => {
        set({ loading: true });
        try {
          const response = await CollectionService.createCollection(data);

          if (response?.data) {
            if (response?.data?.collection) {
              set({ collection: { ...response?.data?.collection } });
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
      fetchCollections: async (data: FetchItemsInterface) => {
        set({ loading: true });
        try {
          const response = await CollectionService.fetchCollections(
            data.page_id,
            data.page_size
          );

          if (response?.data) {
            if (response?.data?.collection) {
              set({ collections: [...response?.data?.collection] });
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
      name: "collection-storage", // Unique name for the storage
      getStorage: () => localStorage, // Define storage, default is localStorage
    }
  )
);
