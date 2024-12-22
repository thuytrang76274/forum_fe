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
import { useState } from "react";

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
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <Checkbox />
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
        <ApprovePostIssue checked={true} post={post} />
        <ApprovePostIssue checked={false} post={post} />
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
