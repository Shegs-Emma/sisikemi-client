import AuthService from "@/api/auth/auth";
import { getCookie, setCookie } from "cookies-next";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";
import { toast } from "sonner";
import {
  EmailVerifyInterface,
  LoginUserResponseInterface,
  RegisterInterface,
} from "@/utils/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useUserStore = createWithEqualityFn(
  devtools(
    persist(
      (set) => ({
        user: {},
        isAuth: false,
        loading: false,
        isVerified: {},
        isToken: !!getCookie("accessToken"),
        resendLoading: false,
        login: async (
          data: LoginUserResponseInterface,
          router: AppRouterInstance,
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
            let userRoute = "";

            userRoute = isAdmin ? `/admin/product` : "/new-in";
            router.push(userRoute);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        register: async (
          data: RegisterInterface,
          router: AppRouterInstance
        ) => {
          set({ loading: true });
          try {
            const response = await AuthService.register(data);

            set({ user: { ...response?.data?.user } });

            toast.success("Registration successful! 🎉");
            let userRoute = "";

            userRoute = `/welcome`;
            router.push(userRoute);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        verifyEmail: async (
          data: EmailVerifyInterface,
          router: AppRouterInstance
        ) => {
          set({ loading: true });
          try {
            const response = await AuthService.verifyEmail(data);

            set({ isVerifled: { ...response?.data?.is_verified } });

            toast.success("Verification successful! 🎉");
            let userRoute = "";

            userRoute = `/login`;
            router.push(userRoute);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
