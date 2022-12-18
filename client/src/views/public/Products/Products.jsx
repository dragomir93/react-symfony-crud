import React from 'react';
import Button from '@mui/material/Button';
import { Avatar, Box, ButtonGroup, Container,
  Paper, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

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
              <Link to="/create">
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
                <TableRow>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center">
                      <Avatar />
                    </Box>
                  </TableCell>
                  <TableCell align="left">Proizvod 1</TableCell>
                  <TableCell align="left">Ovo je neki opis</TableCell>
                  <TableCell align="left">300 $</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button>Edit</Button>
                      <Button>Delete</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    );
}

export default Products;