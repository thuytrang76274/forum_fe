import axios from "axios";
import { baseUrl } from "./config";

export const postUrl = `${baseUrl}/post`;

export async function getListPost(url: string, token: string) {
  return await axios({
    url: `${postUrl}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}

export async function getSinglePost(id: number, token: string) {
  return await axios({
    url: `${postUrl}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}
