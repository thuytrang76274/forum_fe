import axios from "axios";
import { baseUrl } from "./config";

export const systemCodeUrl = `${baseUrl}/system-code`;

export async function getCustomer(token: string) {
  return await axios({
    url: `${systemCodeUrl}/CUSTOMER/system-code-detail`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getType(token: string) {
  return await axios({
    url: `${systemCodeUrl}/TYPE/system-code-detail`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getModule(token: string) {
  return await axios({
    url: `${systemCodeUrl}/MODULE/system-code-detail`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
