import axios from "axios";
import {
  EmailVerifyInterface,
  ForgotPasswordInterface,
  LoginUserResponseInterface,
  RegisterInterface,
  ResetPasswordInterface,
  VerifyCodeInterface,
} from "@/utils/interface";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default class AuthService {
  static async loginAdmin(data: LoginUserResponseInterface) {
    return axios.post(`${API_URL}login_user`, data);
  }

  static async register(data: RegisterInterface) {
    return axios.post(`${API_URL}create_user`, data);
  }

  static async verifyEmail(data: EmailVerifyInterface) {
    return axios.post(`${API_URL}verify_email`, data);
  }

  static async forgotPassword(data: ForgotPasswordInterface) {
    return axios.post(`${API_URL}forgot_password`, data);
  }

  static async verifyCode(data: VerifyCodeInterface) {
    return axios.post(`${API_URL}verify_code`, data);
  }

  static async resetPassword(data: ResetPasswordInterface) {
    return axios.post(`${API_URL}reset_password`, data);
  }
}
