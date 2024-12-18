import axios from "axios";
import { baseUrl } from "./config";

export const commentUrl = `${baseUrl}/comment`;

export async function getListCommentByPost(postId: number, token: string) {
  return await axios({
    url: `${commentUrl}/post/${postId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}
