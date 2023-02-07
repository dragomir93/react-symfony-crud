import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Alert, Avatar, Box, ButtonGroup, Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow, Typography } from '@mui/material';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { getProducts, removeProduct } from './Api';
import { useState } from 'react';
import { publicRouteCodes } from '../../../constants/RouteCodes';
import { Stack } from '@mui/system';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Products = () => {
  const location = useLocation();
  const [products,setProducts] = useState([]);
  const [removeProductChecked,setRemoveProductChecked] = useState(false);
  const [isCreatedProduct,setIsCreatedProduct] = useState(false);
  const [isUpdatedProduct,setIsUpdatedProduct] = useState(false);
  const [productDelete,setProductDelete] = useState([]);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.isEdit) {
      setIsUpdatedProduct(location.state.isCreated);
      } else {
      setIsCreatedProduct(location.state.isCreated);
      }
    }
    showProducts()
  }, []);

  setTimeout(() => {
    setIsCreatedProduct(false);
    setIsUpdatedProduct(false);
  }, 2000);

  const showProducts = () => {
    getProducts().then((response) => {
      setProducts(response);
      setRemoveProductChecked(false);
    });
  }
  const showProduct = (productId) => {
    navigate(generatePath(generatePath(
      publicRouteCodes.PRODUCTS_SHOW, { id: productId },
    )));
  }

  const updateProduct = (productId) => {
    navigate(generatePath(generatePath(
      publicRouteCodes.PRODUCTS_EDIT, { id: productId },
    )));
  }

  const handleDeleteProductPopup = (productId)  => {
      setOpen(true);
      setProductDelete(productId);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = (productId) => {
      removeProduct(productId).then(() => {
        handleClose();
        showProducts();
        setRemoveProductChecked(true);
      }).catch(() => {
      });
  }

  const classes = useStyles();

    return (
      <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex" marginBottom={3}>
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Products
              </Typography>
            </Box>
            <Box>
              <Link to={publicRouteCodes.PRODUCTS_CREATE}>
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell align="right">{product.productId}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar src={product.image}/>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="left">{product.price} $</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => showProduct(product.productId)} color="success">Show</Button>
                      <Button onClick={() => updateProduct(product.productId)}>Edit</Button>
                      <Button onClick={() => handleDeleteProductPopup(product.productId)} color="error">Delete</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
      {removeProductChecked &&
      <Stack sx={{ width: '13%',marginBottom:'10px',marginLeft:'10px',position:'fixed',bottom:0}}>
        <Alert severity="success">Product has been deleted!</Alert>
       </Stack>
      }
      {isCreatedProduct &&
      <Stack sx={{ width: '13%',marginBottom:'10px',marginLeft:'10px',position:'fixed',bottom:0}}>
        <Alert severity="success">Product has been created!</Alert>
       </Stack>
      }
       {isUpdatedProduct &&
      <Stack sx={{ width: '13%',marginBottom:'10px',marginLeft:'10px',position:'fixed',bottom:0}}>
        <Alert severity="success">Product has been updated!</Alert>
       </Stack>
      }
      {open &&  
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Alert"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         Do you want to delete product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={() => deleteProduct(productDelete)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>}
    </div>
    );
}

export default Products;