import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Importa el paquete completo de Swiper
import { Box, Typography } from "@mui/material";

const TestimonialsDetails = () => {
  return (
    <Box mt={4}>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <Box display="flex" alignItems="center">
            <img
              src="/images/shotsPrincipals/Horner.png"
              alt="Testimonial 1"
              style={{
                width: "50%",
                marginRight: "20px",
                borderRadius: ".5rem",
              }}
            />
            <Typography variant="body1">
              Excelente producto, lo recomendaría a todos mis amigos.
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box display="flex" alignItems="center">
            <img
              src="/images/shotsPrincipals/Andrea.png"
              alt="Testimonial 2"
              style={{
                width: "50%",
                marginRight: "20px",
                borderRadius: ".5rem",
              }}
            />
            <Typography variant="body1">
              ¡El mejor producto que he comprado en mucho tiempo!
            </Typography>
          </Box>
        </SwiperSlide>
        {/* Agrega más diapositivas de testimonios según sea necesario */}
      </Swiper>
    </Box>
  );
};

export default TestimonialsDetails;
