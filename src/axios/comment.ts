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

export async function addCommentToPost(
  payload: { content: string; post: { id: number } },
  token: string
) {
  return await axios({
    url: `${commentUrl}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    method: "post",
  });
}

export async function pinComment(commentId: number, token: string) {
  return await axios({
    url: `${commentUrl}/${commentId}/pin`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "patch",
  });
}

export async function unpinComment(commentId: number, token: string) {
  return await axios({
    url: `${commentUrl}/${commentId}/unpin`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "patch",
  });
}
