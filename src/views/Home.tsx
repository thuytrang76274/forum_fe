import { Box, Stack } from "@mui/material";
import { FilterPost, LeftBar, ListViewPost } from "../components";
import TopDiscussion from "../components/TopDiscussion";
import { useEffect, useState } from "react";
import { CommentDto, PostDto, SystemCodeDetailDto, UserDto } from "../dtos";
import { getListPost } from "../axios/post";
import { useAppStore } from "../hooks";
import { FilterPostState, OptionFilterPost } from "../types";
import { getAllUsers } from "../axios/user";
import { getCustomer, getModule, getType } from "../axios/systemcode";
import { getVersions } from "../axios/issue";
import { useLocation } from "react-router";
import { getCommentsByPost } from "../axios/comment";

function Home() {
  const { state } = useAppStore();
  const { pathname } = useLocation();
  const [filter, setFilter] = useState<FilterPostState>({
    dateType: "createdAt",
    fromDate: null,
    toDate: null,
    status: "",
    reporters: [],
    assignees: [],
    type: "",
    customer: "",
    module: "",
    version: "",
    isDealCustomer: "",
  });
  const [options, setOptions] = useState<OptionFilterPost>({
    dateType: [
      { label: "Created date", value: "createdAt" },
      { label: "Last modified", value: "modifiedAt" },
      { label: "Approved at", value: "approvedAt" },
    ],
    statuses: ["ANALYST", "DONE", "PENDING", "CLOSE"],
    reporters: [],
    assignees: [],
    types: [],
    customers: [],
    modules: [],
    versions: [],
    isDealCustomers: ["true", "false"],
  });
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  async function getInfo() {
    try {
      let response = await getAllUsers(state.user?.token);
      const reportersResponse: UserDto[] = response.data.data;
      response = await getAllUsers(state.user?.token);
      const assigneesResponse: UserDto[] = response.data.data;
      response = await getType(state.user?.token);
      const typesResponse: SystemCodeDetailDto[] = response.data.data;
      response = await getCustomer(state.user?.token);
      const customersResponse: SystemCodeDetailDto[] = response.data.data;
      response = await getModule(state.user?.token);
      const modulesResponse: SystemCodeDetailDto[] = response.data.data;
      response = await getVersions(state.user?.token);
      const versionsResponse: string[] = response.data.data;
      setOptions({
        ...options,
        reporters: reportersResponse,
        assignees: assigneesResponse,
        types: typesResponse,
        customers: customersResponse,
        modules: modulesResponse,
        versions: versionsResponse,
      });
      let url = `?typeDate=${filter.dateType}&page=0&size=100`;
      if (pathname.startsWith("/appendix")) {
        url = url.concat(`&isAppendix=true`);
      }
      setLoading(true);
      response = await getListPost(url, state.user?.token);
      const postsResponse: PostDto[] = response.data.data.data;
      for (let i = 0; i < postsResponse.length; ++i) {
        response = await getCommentsByPost(
          postsResponse[i].id,
          state.user?.token
        );
        const commentsResponse: CommentDto[] = response.data.data;
        postsResponse[i].comments = commentsResponse;
      }
      setPosts(postsResponse);
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
      if (filter.reporters?.length > 0) {
        for (let i = 0; i < filter.reporters?.length; ++i) {
          url = url.concat(`&reporter=${filter.reporters[i]}`);
        }
      }
      if (filter.assignees.length > 0) {
        for (let i = 0; i < filter.assignees.length; ++i) {
          url = url.concat(`&assignee=${filter.assignees[i]}`);
        }
      }
      if (filter.type !== "") url = url.concat(`&type=${filter.type}`);
      if (filter.customer !== "")
        url = url.concat(`&customer=${filter.customer}`);
      if (filter.module !== "") url = url.concat(`&module=${filter.module}`);
      if (filter.version !== "") url = url.concat(`&version=${filter.version}`);
      if (filter.isDealCustomer !== "")
        url = url.concat(`&isDealCustomer=${filter.isDealCustomer}`);
      if (pathname.startsWith("/appendix")) {
        url = url.concat(`&isAppendix=true`);
      }
      setLoading(true);
      let response = await getListPost(url, state.user?.token);
      const postsResponse: PostDto[] = response.data.data.data;
      for (let i = 0; i < postsResponse.length; ++i) {
        response = await getCommentsByPost(
          postsResponse[i].id,
          state.user?.token
        );
        const commentsResponse: CommentDto[] = response.data.data;
        postsResponse[i].comments = commentsResponse;
      }
      setPosts(postsResponse);
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
          width="725px"
          marginX="50px"
          marginTop="40px"
          sx={{
            height: `calc(100vh - 84px - 40px)`,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <FilterPost
            filter={filter}
            setFilter={setFilter}
            options={options}
            handleSearch={handleSearch}
          />
          <ListViewPost posts={posts} loading={loading} />
        </Box>
        <TopDiscussion />
      </Box>
    </Stack>
  );
}

export default Home;
