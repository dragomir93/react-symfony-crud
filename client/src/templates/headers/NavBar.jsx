import React from 'react';
import {
  AppBar, Toolbar, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { publicRouteCodes } from '../../constants/RouteCodes';

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
  navlink: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '1%',
  },
  logo: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: 'auto',
    '& img': {
      height: '50px',
    },
  },
}));

const NavBar = () => {

    const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.navlink} to={publicRouteCodes.PRODUCTS}>
            <Typography variant="h6" className={classes.title}>
              CRUD
            </Typography>
          </Link>
          <Link className={classes.logo} to={publicRouteCodes.PRODUCTS}>
            <img className="whitelabelLogo" alt="logo" src="/logo.svg" />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
