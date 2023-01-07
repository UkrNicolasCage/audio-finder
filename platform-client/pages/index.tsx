import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box
        mt="150px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h1">Home</Typography>
        <Typography variant="h3">Welcome</Typography>
      </Box>
    </>
  );
}
