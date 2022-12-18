import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
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
    navlink:{
      color: 'white',
      textDecoration: 'none'
    }
  }));

const NavBar = () => {

    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Link className={classes.navlink} to={publicRouteCodes.PRODUCTS}>
              <Typography variant="h6" className={classes.title}>
                CRUD
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default NavBar;