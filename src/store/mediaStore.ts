import { getCookie } from "cookies-next";
// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import { MediaUploadInterface } from "@/utils/interface";
import MediaService from "@/api/media/media";

export const useMediaStore = createWithEqualityFn(
  devtools(
    (set, get) => ({
      medium: [],
      media: {},
      loading: false,
      createMedia: async (data: MediaUploadInterface, router: any) => {
        set({ loading: true });
        try {
          const response = await MediaService.uploadImage(data);

          if (response?.data) {
            if (response?.data?.media) {
              set({ media: { ...response?.data?.media } });
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
      name: "media-storage", // Unique name for the storage
      getStorage: () => localStorage, // Define storage, default is localStorage
    }
  )
);
