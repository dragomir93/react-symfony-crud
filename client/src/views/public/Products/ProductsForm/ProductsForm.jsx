import { Alert, Button, Container, Grid, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { publicRouteCodes } from "../../../../constants/RouteCodes";
import ApiClient from "../../../../api/ApiClient";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
}));

const ProductsForm = () => {

  let navigate = useNavigate();
  const [formItems, setFormItems] = useState({
    name: "",
    price: null,
    description: "",
    image: null,
  });

  const handleFormItemsChange = (value, field) => {
    setFormItems((prevState) => ({ ...prevState, [field]: value }));
  };

  const redirectToEmployeeList = () => {
    navigate(publicRouteCodes.PRODUCTS, {state: {isCreated:true} });
  };

  const handleSubmit = () => {
    const formData = { ...formItems };
    ApiClient.post("/api/product", JSON.stringify(formData)).then(() => {
        redirectToEmployeeList();
      })
      .catch(({ response }) => {
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  return (
  <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                onChange={(event) =>
                  handleFormItemsChange(event.target.value, "name")
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                onChange={(event) =>
                  handleFormItemsChange(event.target.value, "price")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="description"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                onChange={(event) =>
                  handleFormItemsChange(event.target.value, "description")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="image"
                label="Image"
                onChange={(event) =>
                  handleFormItemsChange(event.target.value, "image")
                }
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ProductsForm;
