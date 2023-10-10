import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Policies = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.3s, border 0.3s, box-shadow 0.3s",
            boxShadow: "0px 2px 5px rgba(188, 84, 73, 0.5)",
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: "0px 4px 10px rgba(188, 84, 73, 0.7)",
              "& .policy-title": {
                color: "#BC5449",
                transition: "color 0.3s, font-style 0.3s",
              },
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "5rem" }}
            image="/public/images/credit-card.png"
            alt="Imagen 3"
          />
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              marginBottom="10px"
              sx={{ fontStyle: "italic" }}
            >
              Hassle-Free Returns
            </Typography>
            <Typography variant="subtitle2">
              {`We make returning items easy and stress-free. If you're not
              completely satisfied with your purchase, you can return it within
              30 days for a full refund.`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.3s, border 0.3s, box-shadow 0.3s",
            boxShadow: "0px 2px 5px rgba(188, 84, 73, 0.5)",
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: "0px 4px 10px rgba(188, 84, 73, 0.7)",
              "& .policy-title": {
                color: "#BC5449",
                transition: "color 0.3s, font-style 0.3s",
              },
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "5rem" }}
            image="/public/images/security.png"
            alt="Imagen 3"
          />
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              marginBottom="10px"
              sx={{ fontStyle: "italic" }}
            >
              Your Security Matters
            </Typography>
            <Typography variant="subtitle2">
              We take your online security seriously. Our website is equipped
              with advanced encryption technology to protect your personal
              information.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.3s, border 0.3s, box-shadow 0.3s",
            boxShadow: "0px 2px 5px rgba(188, 84, 73, 0.5)",
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: "0px 4px 10px rgba(188, 84, 73, 0.7)",
              "& .policy-title": {
                color: "#BC5449",
                transition: "color 0.3s, font-style 0.3s",
              },
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "5rem" }}
            image="/public/images/delivery.png"
            alt="Imagen 3"
          />
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              marginBottom="10px"
              sx={{ fontStyle: "italic" }}
            >
              Fast and Reliable Shipping
            </Typography>
            <Typography variant="subtitle2">
              We strive to get your orders to your doorstep as quickly as
              possible. Enjoy fast and reliable shipping on all your purchases.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Policies;
