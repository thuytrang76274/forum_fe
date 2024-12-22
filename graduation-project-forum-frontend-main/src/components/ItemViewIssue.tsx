import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { IoStarOutline } from "react-icons/io5";
import { useAppStore } from "../hooks";
import { useNavigate } from "react-router";
import { IssueDto } from "../dtos";
import { useState } from "react";
import DialogUpdateIssue from "./DialogUpdateIssue";

const ItemViewIssue = ({ issue }: { issue: IssueDto }) => {
  const navigate = useNavigate();
  const { state } = useAppStore();
  const handleListAssignee = () => {
    const assigneeLength = issue.assignees?.length;
    if (assigneeLength === undefined || assigneeLength === 0) return "--";
    let result = "";
    for (let i = 0; i < assigneeLength - 1; ++i) {
      result = result.concat(`${issue.assignees[i].name}, `);
    }
    return result.concat(`${issue.assignees[assigneeLength - 1].name}`);
  };
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box display="flex">
        <Card sx={{ width: "725px" }}>
          <CardHeader
            avatar={<Avatar>{issue.createdBy[0]}</Avatar>}
            action={
              state.user?.role === "ADMIN" && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleOpen}
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
              )
            }
            title={issue.createdBy}
            subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
          />
          <CardContent>
            <Typography sx={{ fontSize: "13px" }}>
              <strong>Issue: </strong>@{issue.createdBy}: {issue.content}
            </Typography>
            <Box
              marginTop="16px"
              component="section"
              display="flex"
              justifyContent="center"
            >
              <img
                src={issue.image?.imageUrl}
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
                <Typography fontSize="13px">{handleListAssignee()}</Typography>
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
                <Button
                  size="small"
                  sx={{ bgcolor: "#F48023" }}
                  onClick={() => navigate("/issue/1/posts")}
                >
                  <Typography fontSize="13px" fontWeight="700" color="white">
                    Approve Post
                  </Typography>
                </Button>
                <Button size="small" sx={{ bgcolor: "#F48023" }}>
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
        open={open}
        handleClose={handleClose}
        currentIssueId={issue.id}
      />
    </>
  );
};

export default ItemViewIssue;
