import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import {Box, Card, CardContent, Container,
  Grid,
  Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { publicRouteCodes } from '../../../constants/RouteCodes';
import { getProductData } from './Api';
import { height } from '@mui/system';

const ProductsShow = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

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

  const classes = useStyles();

  useEffect(() => {
    getProductData(id).then((response) => {
      setProduct(response);
    }).catch((error) => {
    
    });
  }, []);

  return (
    <Container className={classes.container} maxWidth="lg">    
      <Paper className={classes.paper}>
        <Box display="flex" marginBottom={3}>
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Product Detail
            </Typography>
          </Box>
          <Box>
            <Link to={publicRouteCodes.HOME} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Back to preview
            </Button>
            </Link>
          </Box>
        </Box>
        <Box>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Name:
                </Typography>
                <Typography>{product.name}</Typography>
                <Typography variant="h6" component="div">
                Price:
                </Typography>
                <Typography>{product.price}.00 $</Typography>
                <Typography variant="h6" component="div">
                Description:
                </Typography>
                <Typography>{product.description}</Typography>
                <Typography variant="h6" component="div">
                Image:
                </Typography>
                <Grid>
                <img
                  src={`/product/image/${id}`}
                  alt={product.image}
                  loading="lazy"
                  style={{ width: '5%', height: '5%' }}
                />
                </Grid>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Container>
  )
}

export default ProductsShow;