import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Policies from "../../policies/Policies";

const Home = () => {
  return (
    <>
      <Box sx={{mb: '5rem'}}>
        <CardMedia
              component='video'
              image={"/public/videos/“No Ordinary Sport” - a Formula 1 edit.mp4"}
              autoPlay
              muted
              sx={{ width: '100%'}}
          />
      </Box>
      <Policies/>
    </>
  );
};

export default Home;
