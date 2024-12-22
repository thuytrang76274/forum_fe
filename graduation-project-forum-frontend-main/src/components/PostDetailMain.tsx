import {
  Box,
  Card,
  CardHeader,
  Avatar,
  Chip,
  CardContent,
  Stack,
  Typography,
  Grid2,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { BiComment } from "react-icons/bi";
import { PostDto } from "../dtos";
import { BsPinAngle } from "react-icons/bs";
import { BsPinAngleFill } from "react-icons/bs";
import { BsHandThumbsUp } from "react-icons/bs";

const PostDetailMain = ({ post }: { post: PostDto | undefined }) => {
  return (
    <Box width="100%">
      <Card>
        <CardHeader
          avatar={<Avatar>{post?.createdBy?.charAt(0)}</Avatar>}
          action={
            <Chip
              sx={{ bgcolor: "#FCF4EC" }}
              label={
                <Typography color="#F48023" fontSize="10px">
                  {"DONE"}
                </Typography>
              }
            />
          }
          title="PDD_ThuyTrang.Nguyen"
          subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
        />
        <CardContent sx={{ paddingTop: "0px" }}>
          <Stack spacing="10px">
            <Typography fontWeight="700" variant="body2">
              Automatically sends inventory emails at 0:00 every day to
              customers?
            </Typography>
            <Typography variant="body2">
              <strong>Issue: </strong>
              "The process of manually downloading inventory from the system
              every day is often repeated. Can the system do it automatically
              and send it to me?"
            </Typography>
            <Typography variant="body2">
              <strong>Description: </strong>
              "This needs to be done. So, what information fields should be sent
              to customers when their only need is to store and compare
              inventory every day?"
            </Typography>
            <Grid2 container>
              <Grid2 size={11} display="flex" alignItems="center">
                <Stack direction="row" spacing="10px">
                  <Box>
                    <Typography
                      variant="body2"
                      fontSize="10px"
                      sx={{
                        background: "#EAEAEA",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>Customer: </strong>Mobile App
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontSize="10px"
                      sx={{
                        background: "#EAEAEA",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>Version: </strong>2.1.0
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontSize="10px"
                      sx={{
                        background: "#EAEAEA",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>Type: </strong>Customized
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontSize="10px"
                      sx={{
                        background: "#EAEAEA",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>Module: </strong>Inventory
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontSize="10px"
                      sx={{
                        background: "#EAEAEA",
                        paddingX: "10px",
                        paddingY: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>Due date: </strong>
                      {dayjs("2024-10-10").format("DD/MM/YYYY")}
                    </Typography>
                  </Box>
                </Stack>
              </Grid2>
              <Grid2 size={1} display="flex" alignItems="center">
                <IconButton size="small">
                  <BiComment />
                </IconButton>
                <Typography variant="body2">15</Typography>
              </Grid2>
              <Grid2 size={12}>
                <hr />
              </Grid2>
            </Grid2>
            <Box
              component="section"
              sx={{ border: "1px solid black" }}
              padding="5px"
            >
              <Typography fontSize="13px" fontWeight="700">
                Solutions:
              </Typography>
              <Typography fontSize="13px">
                PDD_Tran.Le: “Submit all information fields on fe”
              </Typography>
              <Typography fontSize="13px">
                DEV_Duyen.Nguyen: “Send information fields about creation and
                editing time to the corresponding database”
              </Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            sx={{
              border: "1px solid #F48023",
              "&:hover": {
                background: "#FCF4EC",
              },
            }}
          >
            <Typography fontSize="13px" sx={{ color: "#F48023" }}>
              Edit post
            </Typography>
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              border: "1px solid #F48023",
              "&:hover": {
                background: "#FCF4EC",
              },
            }}
          >
            <Typography fontSize="13px" sx={{ color: "#F48023" }}>
              Add comment
            </Typography>
          </Button>
        </CardActions>
      </Card>
      <Typography fontSize="15px" fontWeight="700" marginTop="16px">
        Suggestions
      </Typography>
      <Card sx={{ marginTop: "16px" }}>
        <CardHeader
          avatar={<Avatar>T</Avatar>}
          action={
            <IconButton>
              <BsPinAngleFill />
            </IconButton>
          }
          title="PDD_ThuyTrang.Nguyen"
          subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
        />
        <CardContent>
          <Typography fontSize="13px">
            Submit all information fields on fe
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small">
            <BsHandThumbsUp />
          </IconButton>
          <Typography fontSize="13px">15</Typography>
        </CardActions>
      </Card>
      <Card sx={{ marginTop: "16px" }}>
        <CardHeader
          avatar={<Avatar>T</Avatar>}
          action={
            <IconButton>
              <BsPinAngle />
            </IconButton>
          }
          title="PDD_ThuyTrang.Nguyen"
          subheader={dayjs("2024-12-17").format("DD/MM/YYYY")}
        />
        <CardContent>
          <Typography fontSize="13px">
            Submit all information fields on fe
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small">
            <BsHandThumbsUp />
          </IconButton>
          <Typography fontSize="13px">15</Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostDetailMain;
