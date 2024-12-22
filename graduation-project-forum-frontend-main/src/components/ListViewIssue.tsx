import { Stack } from "@mui/material";
import ItemViewIssue from "./ItemViewIssue";

const ListViewIssue = () => {
  const issue = {
    id: 1,
    customer: {
      id: 1,
      codeName: "TTC AGRIS",
    },
    type: {
      id: 1,
      codeName: "Website",
    },
    version: "2.1.0",
    dueDate: "20/10/2024",
    assignees: [
      {
        id: 1,
        codeName: "PDD_Thy.Nguyen",
      },
      {
        id: 2,
        codeName: "PDD_ThuyTrang.Nguyen",
      },
    ],
    content:
      "The process of manually downloading inventory from the system every day is often repeated. Can the system do it automatically and send it to me?",
    createdBy: "xxxx",
    image: {
      id: 1,
      imageUrl: "https://www.w3schools.com/images/lamp.jpg",
    },
    isAppendix: true,
    isDealCustomer: false,
    status: "DONE",
  };
  return (
    <Stack marginTop="45px" spacing="45px">
      <ItemViewIssue issue={issue} />
      <ItemViewIssue issue={issue} />
    </Stack>
  );
};

export default ListViewIssue;
