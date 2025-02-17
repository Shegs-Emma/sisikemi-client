import axios from "axios";
import {
  EmailVerifyInterface,
  LoginUserResponseInterface,
  RegisterInterface,
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
}
