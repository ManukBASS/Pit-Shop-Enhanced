import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import TypeIt from "typeit";
import TeamRadioBox from "../../teamRadio/TeamRadioBox";

const Home = () => {
  // const products = [
  //   {
  //     title: "Ferrari T-shirt",
  //     description: "A must for every tifosi on race week !",
  //     category: "T-shirts",
  //     stock: 2,
  //     unit_price: 100,
  //     image: "https://firebasestorage.googleapis.com/v0/b/pit-shop-ecommerce.appspot.com/o/ferrari_tshirt.jpg?alt=media&token=ddd388e0-39eb-4cb5-8c1c-dfce704847b4"
  //   }
  // ]

  return (
    <>
      <Box>
        <Image width={"100%"} src="/public/images/Landing_Ferrari_2021v2.jpg" />
      </Box>
    </>
  );
};

export default Home;
