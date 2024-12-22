import { Box, Stack } from "@mui/material";
import { FilterIssue, LeftBar, ListViewIssue } from "../components";
import { useEffect, useState } from "react";
import { IssueDto, SystemCodeDetailDto, UserDto } from "../dtos";
import { getListIssue, getVersions } from "../axios/issue";
import { useAppStore } from "../hooks";
import { FilterIssueState, OptionFilterIssue } from "../types";
import { getType, getCustomer } from "../axios/systemcode";
import { getAllUsers } from "../axios/user";

function Issue() {
  const { state } = useAppStore();
  const [filter, setFilter] = useState<FilterIssueState>({
    dateType: "createdAt",
    fromDate: null,
    toDate: null,
    status: "",
    assignees: [],
    type: "",
    customer: "",
    version: "",
    isDealCustomer: "",
    isAppendix: "",
  });
  const [options, setOptions] = useState<OptionFilterIssue>({
    dateType: [
      { label: "Due date", value: "dueDate" },
      { label: "Created date", value: "createdAt" },
    ],
    statuses: ["ANALYST", "DONE", "PENDING", "CLOSE"],
    assignees: [],
    types: [],
    customers: [],
    versions: [],
    isDealCustomers: ["true", "false"],
    isAppendix: ["true", "false"],
  });
  const [issues, setIssues] = useState<IssueDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  async function getInfo() {
    try {
      let response = await getAllUsers(state.user?.token);
      const assigneesResponse: UserDto[] = response.data.data;
      response = await getType(state.user?.token);
      const typesResponse: SystemCodeDetailDto[] = response.data.data;
      response = await getCustomer(state.user?.token);
      const customersResponse: SystemCodeDetailDto[] = response.data.data;
      response = await getVersions(state.user?.token);
      const versionsResponse: string[] = response.data.data;
      setOptions({
        ...options,
        assignees: assigneesResponse,
        types: typesResponse,
        customers: customersResponse,
        versions: versionsResponse,
      });
      const url = `?typeDate=${filter.dateType}&page=0&size=100`;
      setLoading(true);
      response = await getListIssue(url, state.user?.token);
      const issueResponse: IssueDto[] = response.data.data.data;
      setIssues(issueResponse);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  async function handleSearch() {
    try {
      let url: string = `?typeDate=${filter.dateType}`;
      if (filter.status !== "") url = url.concat(`&status=${filter.status}`);
      if (filter.assignees.length > 0) {
        for (let i = 0; i < filter.assignees.length; ++i) {
          url = url.concat(`&assignee=${filter.assignees[i]}`);
        }
      }
      if (filter.type !== "") url = url.concat(`&type=${filter.type}`);
      if (filter.customer !== "")
        url = url.concat(`&customer=${filter.customer}`);
      if (filter.version !== "") url = url.concat(`&version=${filter.version}`);
      if (filter.isDealCustomer !== "")
        url = url.concat(`&isDealCustomer=${filter.isDealCustomer}`);
      if (filter.isAppendix !== "")
        url = url.concat(`&isAppendix=${filter.isAppendix}`);
      setLoading(true);
      const response = await getListIssue(url, state.user?.token);
      const postResponse: IssueDto[] = response.data.data.data;
      setIssues(postResponse);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <Stack direction="row" bgcolor="#FAFAFA">
      <LeftBar />
      <Box display="flex" sx={{ height: `calc(100vh - 84px)` }}>
        <Box
          marginX="50px"
          marginTop="40px"
          sx={{
            height: `calc(100vh - 84px - 40px)`,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <FilterIssue
            filter={filter}
            setFilter={setFilter}
            options={options}
            handleSearch={handleSearch}
          />
          <ListViewIssue issues={issues} loading={loading} />
        </Box>
      </Box>
    </Stack>
  );
}

export default Issue;
