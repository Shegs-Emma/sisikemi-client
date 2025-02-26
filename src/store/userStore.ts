import AuthService from "@/api/auth/auth";
import { getCookie, setCookie } from "cookies-next";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";
import { toast } from "sonner";
import {
  EmailVerifyInterface,
  ForgotPasswordInterface,
  LoginUserResponseInterface,
  RegisterInterface,
  ResetPasswordInterface,
  VerifyCodeInterface,
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
        isCodeSent: {},
        codeVerified: {},
        passwordReset: {},
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
        forgotPassword: async (
          data: ForgotPasswordInterface,
          router: AppRouterInstance
        ) => {
          set({ loading: true });
          try {
            const response = await AuthService.forgotPassword(data);

            set({ isCodeSent: { ...response?.data?.code_is_sent } });

            toast.success("Verification Code sent successfully! 🎉");
            localStorage.setItem("email", data.email);
            let userRoute = "";

            userRoute = `/verification_code`;
            router.push(userRoute);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message ||
              "An error occurred while logging in";
            toast.error(errorMessage);
            set({ isAuth: false });
          } finally {
            set({ loading: false });
          }
        },
        verifyCode: async (
          data: VerifyCodeInterface,
          router: AppRouterInstance
        ) => {
          set({ loading: true });
          try {
            const response = await AuthService.verifyCode(data);

            set({ codeVerified: { ...response?.data?.isVerified } });

            toast.success("Verification Code correct! 🎉");
            localStorage.setItem("code", data.code);
            let userRoute = "";

            userRoute = `/reset_password`;
            router.push(userRoute);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message ||
              "An error occurred while logging in";
            toast.error(errorMessage);
            set({ isAuth: false });
          } finally {
            set({ loading: false });
          }
        },
        resetPassword: async (
          data: ResetPasswordInterface,
          router: AppRouterInstance
        ) => {
          set({ loading: true });
          try {
            const response = await AuthService.resetPassword(data);

            set({ passwordReset: { ...response?.data?.isUpdated } });

            toast.success("Password reset successfully! 🎉");
            localStorage.removeItem("code");
            localStorage.removeItem("email");
            let userRoute = "";

            userRoute = `/login`;
            router.push(userRoute);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message ||
              "An error occurred while logging in";
            toast.error(errorMessage);
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
