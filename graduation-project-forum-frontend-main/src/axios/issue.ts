import axios from "axios";
import { baseUrl } from "./config";
import { IssueDto } from "../dtos";

export const issueUrl = `${baseUrl}/issue`;

async function getListIssue(url: string, token: string) {
  return await axios({
    url: `${issueUrl}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}

async function getSingleIssue(issueId: number, token: string) {
  return await axios({
    url: `${issueUrl}/${issueId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  });
}

async function updateIssue(
  issueId: number,
  updateObject: IssueDto,
  token: string
) {
  return await axios({
    url: `${issueUrl}/${issueId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: updateObject,
    method: "patch",
  });
}
