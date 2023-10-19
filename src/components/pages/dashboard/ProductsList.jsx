import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  IconButton,
  Skeleton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "../../../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProductsForm from "./ProductsForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#BC5449",
    },
  },
});

const ProductsList = ({ products, setIsChange }) => {
  const [open, setOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);

  const deleteProduct = (id) => {
    deleteDoc(doc(db, "products", id));
    setIsChange(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (product) => {
    setProductSelected(product);
    setOpen(true);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "1rem" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOpen(null)}
          >
            Add New
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Stock</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                // Mostrar el esqueleto de la tabla cuando no hay datos
                <TableRow>
                  <TableCell>
                    <Skeleton height={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={80} />
                  </TableCell>
                </TableRow>
              ) : (
                // Renderizar la tabla con datos reales cuando existan productos
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {product.id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {product.title}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {product.unit_price}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {product.stock}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {product.category}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <IconButton onClick={() => handleOpen(product)}>
                        <EditIcon color="action" />
                      </IconButton>
                      <IconButton onClick={() => deleteProduct(product.id)}>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ProductsForm
              handleClose={handleClose}
              setIsChange={setIsChange}
              productSelected={productSelected}
              setProductSelected={setProductSelected}
            />
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default ProductsList;
