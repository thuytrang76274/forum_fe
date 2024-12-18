import axios from "axios";
import { LoginDto } from "../dtos";
import { baseUrl } from "./config";
export const userUrl = `${baseUrl}/user`;

export async function login(login: LoginDto) {
  return await axios({
    url: `${userUrl}/login`,
    data: login,
    method: "post",
  });
}

export async function getUserProfile(token: string) {
  return await axios({
    url: `${userUrl}/current-user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUserById(id: number, token: string) {
  return await axios({
    url: `${userUrl}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
