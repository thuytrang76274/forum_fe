import axios from "axios";
import { baseUrl } from "./config";

export const issueUrl = `${baseUrl}/issue`;

export async function getListIssue(url: string, token: string) {
  return await axios({
    url: `${issueUrl}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}

export async function getVersions(token: string) {
  return await axios({
    url: `${issueUrl}/versions`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}

export async function getSingleIssue(issueId: number, token: string) {
  return await axios({
    url: `${issueUrl}/${issueId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}

export async function updateIssue(
  issueId: number,
  payload: unknown,
  token: string
) {
  return await axios({
    url: `${issueUrl}/${issueId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    method: "patch",
  });
}

export async function createIssue(payload: FormData, token: string) {
  return await axios({
    url: `${issueUrl}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: payload,
    method: "post",
  });
}

export async function callFromPenpot(token: string) {
  return await axios({
    url: `${issueUrl}/call-penpot`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}
