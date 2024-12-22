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

export async function createNewPost(payload: unknown, token: string) {
  return await axios({
    url: `${postUrl}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    method: "post",
  });
}

export async function getPostsByIssue(issueId: number, token: string) {
  return await axios({
    url: `${postUrl}/issue/${issueId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}

export async function updatePost(id: number, payload: unknown, token: string) {
  return await axios({
    url: `${postUrl}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    method: "patch",
  });
}
