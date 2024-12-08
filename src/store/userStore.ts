import AuthService from "@/api/auth/auth";
import { getCookie, setCookie } from "cookies-next";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";
import { toast } from "sonner";
import {
  LoginUserResponseInterface,
  RegisterInterface,
} from "@/utils/interface";

export const useUserStore = createWithEqualityFn(
  devtools(
    persist(
      (set, get) => ({
        user: {},
        isAuth: false,
        loading: false,
        isToken: !!getCookie("accessToken"),
        resendLoading: false,
        login: async (
          data: LoginUserResponseInterface,
          router: any,
          isAdmin: boolean
        ) => {
          set({ loading: true });
          try {
            const response = await AuthService.loginAdmin(data);

            setCookie("accessToken", response?.data?.access_token);
            setCookie("refreshToken", response?.data?.refresh_token);

            set({ user: { ...response?.data?.user } });
            set({ isAuth: true });

            toast.success("Login successful! 🎉");
            let userRoute;

            userRoute = isAdmin ? `/admin/product` : "/new-in";
            router.push(userRoute);
          } catch (error: any) {
            console.log("here:", error);
            const errorMessage =
              error?.response?.data?.message ||
              "An error occurred while logging in";
            toast.error(errorMessage);
            if (error?.response?.data?.isEmailVerificationError) {
              const userRole = error?.response?.data?.userRole;
              const userRoute = `/${userRole}/confirm?email=${error?.response?.data?.email}`;
              router.push(userRoute);
            }
            set({ isAuth: false });
          } finally {
            set({ loading: false });
          }
        },
        register: async (data: RegisterInterface, router: any) => {
          set({ loading: true });
          try {
            const response = await AuthService.register(data);

            set({ user: { ...response?.data?.user } });

            toast.success("Registration successful! 🎉");
            let userRoute;

            userRoute = `/login`;
            router.push(userRoute);
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message ||
              "An error occurred while logging in";
            toast.error(errorMessage);
            if (error?.response?.data?.isEmailVerificationError) {
              const userRole = error?.response?.data?.userRole;
              const userRoute = `/${userRole}/confirm?email=${error?.response?.data?.email}`;
              router.push(userRoute);
            }
            set({ isAuth: false });
          } finally {
            set({ loading: false });
          }
        },
      }),
      {
        name: "user-storage", // Unique name for the storage
        getStorage: () => localStorage, // Define storage, default is localStorage
      }
    )
  )
);
