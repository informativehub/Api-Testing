import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";


const Home = () => {
  return (
    <Box
      height={500}
      width={500}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      margin="auto"
      sx={{ border: "2px solid grey" }}
    >
      <Stack direction="row" spacing={2}>
        <Link to="/whatsapp">
          <Button variant="outlined">WhatsApp</Button>
        </Link>
        <Link to="/gmail">
          <Button variant="outlined">Gmail</Button>
        </Link>
        <Link to="/translate">
          <Button variant="outlined">Translate</Button>
        </Link>
        <Link to="/crizbizz">
          <Button variant="outlined">Crizzbizz</Button>
        </Link>
        <Link to="/download">
          <Button variant="outlined">Download</Button>
        </Link>
        <Link to="/seo">
          <Button variant="outlined">Seo</Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default Home;
