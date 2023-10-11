import Box from "@mui/material/Box";
import Policies from "../../policies/Policies";

const Home = () => {
  return (
    <>
      <Box sx={{mb: '5rem'}}>
          <video autoPlay loop muted style={{width: '100%', borderRadius: '10px'}}>
            <source src="/public/videos/“No Ordinary Sport” - a Formula 1 edit.mp4"/>
          </video>
      </Box>
      <Policies/>
    </>
  );
};

export default Home;
