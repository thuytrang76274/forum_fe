import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ApprovePostIssue from "./ApprovePostIssue";
import { PostDto } from "../dtos";
import { useEffect, useState } from "react";
import { getPostsByIssue } from "../axios/post";
import { useAppStore } from "../hooks";
import { useParams } from "react-router";

const ListViewApprovePost = () => {
  const post: PostDto = {
    id: 1,
    title: "--",
    issue: {
      id: 1,
      content:
        "The process of manually downloading inventory from the system every day is often repeated. Can the system do it automatically and send it to me?",
      version: "2.1.0",
      type: {
        id: 1,
        codeName: "Customized",
      },
      customer: {
        id: 1,
        codeName: "TTC AGRIS",
      },
      assignees: [
        { id: 1, name: "PDD_Thy.Nguyen" },
        { id: 2, name: "PDD_ThuyTrang.Nguyen" },
      ],
      isAppendix: true,
      isDealCustomer: false,
      dueDate: "20/10/2024",
    },
    description:
      "This needs to be done. So, what information fields should be sent to customers when their only need is to store and compare inventory every day?",
    customer: {
      id: 1,
      codeName: "TTC AGRIS",
    },
    module: {
      id: 1,
      codeName: "Inventory",
    },
    createdBy: "PDD_ThuyTrang.Nguyen",
    createdAt: "17/12/2024",
  };
  const [openRefuseAll, setOpenRefuseAll] = useState<boolean>(false);
  const handleOpenRefuseAll = () => setOpenRefuseAll(true);
  const handleCloseRefuseAll = () => setOpenRefuseAll(false);
  const { state } = useAppStore();
  const { id } = useParams();
  const [posts, setPosts] = useState<PostDto[] | undefined>(undefined);
  const [checked, setChecked] = useState<number[] | undefined>([]);
  async function getInfo() {
    try {
      const response = await getPostsByIssue(
        id as unknown as number,
        state.user?.token
      );
      const postsResponse: PostDto[] = response.data.data;
      setPosts(postsResponse);
      setChecked([]);
    } catch (e) {
      console.log(e);
    }
  }
  function handleCheck(id: number) {
    if (checked?.includes(id)) {
      const newChecked = checked.filter((i) => i !== id);
      setChecked(newChecked);
      return;
    }
    const newChecked = [...checked!];
    newChecked.push(id);
    setChecked(newChecked);
    return;
  }
  console.log(checked);
  function handleCheckAll() {
    if (checked?.length === 0) {
      const newChecked = posts?.slice().map((p) => p.id);
      setChecked(newChecked);
      return;
    }
    setChecked([]);
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <Checkbox checked={checked?.length !== 0} onChange={handleCheckAll} />
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ bgcolor: "black" }}
            onClick={handleOpenRefuseAll}
          >
            <Typography fontSize="13px" sx={{ textTransform: "none" }}>
              Refuse
            </Typography>
          </Button>
        </Box>
      </Box>
      <Stack marginTop="45px" spacing="45px">
        {posts &&
          checked &&
          posts
            .filter((p) => p.status === "WAITING_APPROVE")
            .map((p, id) => (
              <ApprovePostIssue
                id={id}
                checked={checked.includes(id) ? true : false}
                onChecked={handleCheck}
                post={p}
              />
            ))}
      </Stack>
      <Dialog
        open={openRefuseAll}
        fullWidth
        onClose={handleCloseRefuseAll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title" fontSize="13px" fontWeight="700">
          Confirm refuse
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography id="modal-modal-description" fontSize="13px">
              Please provide the reason below
            </Typography>
            <TextField required variant="outlined" size="small" fullWidth />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#F48023",
            }}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              Send
            </Typography>
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ bgcolor: "black", ml: "10px" }}
            onClick={handleCloseRefuseAll}
          >
            <Typography
              fontSize="13px"
              color="white"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListViewApprovePost;
