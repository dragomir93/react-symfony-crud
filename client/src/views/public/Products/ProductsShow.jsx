import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import {Box, Card, CardContent, Container,
  Paper, Typography } from '@mui/material';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { publicRouteCodes } from '../../../constants/RouteCodes';

const ProductsShow = () => {
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
            <Link to={publicRouteCodes.HOME}>
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
                <Typography>Test</Typography>
                <Typography variant="h6" component="div">
                Price:
                </Typography>
                <Typography>Test</Typography>
                <Typography variant="h6" component="div">
                Description:
                </Typography>
                <Typography>Test</Typography>
                <Typography variant="h6" component="div">
                Image:
                </Typography>
                <Typography>Test</Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Container>
  )
}

export default ProductsShow;