import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Alert, Avatar, Box, ButtonGroup, Container,
  Paper, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    if (location.state !== null) {
      setIsCreatedProduct(location.state.isCreated);
    }
    showProducts()
  }, []);

  setTimeout(() => {
    setIsCreatedProduct(false);
  }, 2000);

  const showProducts = () => {
    getProducts().then((response) => {
      setProducts(response);
      setRemoveProductChecked(false);
    });
  }

  const updateProduct = (productId) => {
      console.log("update product "+productId);
  }

  const deleteProduct = (productId) => {
      removeProduct(productId).then(() => {
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
                USERS
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
                      <Button onClick={() => updateProduct(product.productId)}>Edit</Button>
                      <Button onClick={() => deleteProduct(product.productId)}>Delete</Button>
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
    </div>
    );
}

export default Products;