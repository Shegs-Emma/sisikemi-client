// zustand
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";
import { MediaUploadCloudinaryInterface } from "@/utils/interface";
import MediaService from "@/api/media/media";

export const useMediaStore = createWithEqualityFn(
  devtools(
    (set) => ({
      medium: [],
      media: {},
      loading: false,
      // createMedia: async (data: MediaUploadInterface) => {
      //   set({ loading: true });
      //   try {
      //     const response = await MediaService.uploadImage(data);

      //     if (response?.data) {
      //       if (response?.data?.media) {
      //         set({ media: { ...response?.data?.media } });
      //       }
      //       set({ loading: false });
      //       return response.data;
      //     }
      //     set({ loading: false });

      //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
      //   } catch (error: any) {
      //     return error;
      //   } finally {
      //     set({ loading: false });
      //   }
      // },
      createMediaCloudinary: async (data: MediaUploadCloudinaryInterface) => {
        set({ loading: true });
        try {
          const response = await MediaService.uploadImageToCloudinary(data);

          if (response?.data) {
            if (response?.data?.media) {
              set({ media: { ...response?.data?.media } });
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
      name: "media-storage", // Unique name for the storage
      getStorage: () => localStorage, // Define storage, default is localStorage
    }
  )
);
