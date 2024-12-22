import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { IoStarOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { IssueDto } from "../dtos";
import { useState } from "react";
import DialogUpdateIssue from "./DialogUpdateIssue";
import DialogCreatePost from "./DialogCreatePost";
import { baseImageUrl } from "../axios/config";

const ItemViewIssue = ({ issue }: { issue: IssueDto }) => {
  const navigate = useNavigate();
  const handleListAssignee = (currentIssue: IssueDto) => {
    const assigneeLength = currentIssue.assignees?.length;
    if (assigneeLength === undefined || assigneeLength === 0) return "--";
    let result = "";
    for (let i = 0; i < assigneeLength - 1; ++i) {
      result = result.concat(
        `${
          currentIssue.assignees[i].name ?? currentIssue.assignees[i].username
        }, `
      );
    }
    return result.concat(
      `${
        currentIssue.assignees[assigneeLength - 1].name ??
        currentIssue.assignees[assigneeLength - 1].username
      }`
    );
  };
  const [openUpdateIssue, setOpenUpdateIssue] = useState<boolean>(false);
  const [openCreatePost, setOpenCreatePost] = useState<boolean>(false);
  const handleOpenUpdateIssue = () => setOpenUpdateIssue(true);
  const handleOpenCreatePost = () => setOpenCreatePost(true);
  return (
    <>
      <Box display="flex">
        <Card sx={{ width: "725px" }}>
          <CardHeader
            avatar={<Avatar>{issue.createdBy[0]}</Avatar>}
            action={
              <Button
                size="small"
                variant="outlined"
                onClick={handleOpenUpdateIssue}
                sx={{
                  border: "1px solid #F48023",
                  "&:hover": {
                    background: "#FCF4EC",
                  },
                }}
              >
                <Typography fontSize="13px" sx={{ color: "#F48023" }}>
                  Edit issue
                </Typography>
              </Button>
            }
            title={issue.createdBy}
            subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
          />
          <CardContent>
            <Typography sx={{ fontSize: "13px" }}>
              <strong>Issue: </strong>@{issue.createdBy}: {issue.content}
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>
              <Link href={issue.penpotPrototypeLink}>Prototype link</Link>
            </Typography>
            <Box
              marginTop="10px"
              component="section"
              display="flex"
              justifyContent="center"
            >
              <img
                src={`${baseImageUrl}/${issue.image?.imageUrl}`}
                alt="Issue"
                width="400px"
                height="100%"
              />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: "277px" }}>
          <CardHeader
            avatar={<IoStarOutline />}
            title="Details"
            action={
              <Chip
                sx={{ bgcolor: "#FCF4EC" }}
                label={
                  <Typography color="#F48023" fontSize="10px">
                    {issue.status}
                  </Typography>
                }
              />
            }
          />
          <CardContent sx={{ paddingTop: "0px" }}>
            <Stack spacing="10px">
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Customer
                </Typography>
                <Typography fontSize="13px">
                  {issue.customer?.codeName}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Assignee
                </Typography>
                <Typography fontSize="13px">
                  {handleListAssignee(issue)}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Type
                </Typography>
                <Typography fontSize="13px">{issue.type?.codeName}</Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Version
                </Typography>
                <Typography fontSize="13px">{issue.version}</Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Due date
                </Typography>
                <Typography fontSize="13px">{issue.dueDate}</Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Is appendix
                </Typography>
                <Typography fontSize="13px">
                  {issue.isAppendix ? "Yes" : "No"}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="13px" fontWeight="700">
                  Is deal customer
                </Typography>
                <Typography fontSize="13px">
                  {issue.isDealCustomer ? "Yes" : "No"}
                </Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between">
                <Badge badgeContent={issue.numberOfPosts} color="primary">
                  <Button
                    disabled={issue.numberOfPosts === 0}
                    size="small"
                    sx={{
                      bgcolor: "#F48023",
                      "&.Mui-disabled": {
                        bgcolor: "#EAEAEA",
                      },
                    }}
                    onClick={() => navigate(`/issue/${issue.id}/posts`)}
                  >
                    <Typography fontSize="13px" fontWeight="700" color="white">
                      Approve Post
                    </Typography>
                  </Button>
                </Badge>
                <Button
                  size="small"
                  sx={{ bgcolor: "#F48023" }}
                  onClick={handleOpenCreatePost}
                >
                  <Typography fontSize="13px" fontWeight="700" color="white">
                    Create Post
                  </Typography>
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <DialogUpdateIssue
        open={openUpdateIssue}
        setOpenUpdateIssue={setOpenUpdateIssue}
        currentIssueId={issue.id}
      />
      <DialogCreatePost
        open={openCreatePost}
        setOpenCreatePost={setOpenCreatePost}
        currentIssueId={issue.id}
      />
    </>
  );
};

export default ItemViewIssue;
