import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { publicRouteCodes } from "../../../../constants/RouteCodes";
import ApiClient from "../../../../api/ApiClient";
import { useNavigate, useParams } from "react-router-dom";
import { getProductData, saveProduct } from "../Api";

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
  const { id } = useParams();
  const isEdit = !!id;
  const [formItems, setFormItems] = useState({
    name: "",
    price: null,
    description: "",
    image: "",
  });

  const [itemErrors, setItemErrors] = useState({});

  useEffect(() => {
    async function fetchProductsData() {
      try {
        if (isEdit) {
        const productData = await getProductData(id);
        const formData = {
          ...formItems,
          ...productData,
        };

        await setFormItems(formData);
      }
      } catch (err) {
        redirectToProductsList();
      }
    }
    fetchProductsData();
  }, [id]);

  const handleFormItemsChange = (value, field) => {
    setFormItems((prevState) => ({ ...prevState, [field]: value }));
  };

  const redirectToProductsList = () => {
    navigate(publicRouteCodes.PRODUCTS, {state: {isCreated:true, isEdit:isEdit} });
  };

  const handleSubmit = () => {
    const formData = { ...formItems };

    if (formItems.name.trim().length === 0){
      setItemErrors((prevState) => ({ ...prevState, name: 'Field is required' }));
    }

    if (formItems.description.trim().length === 0) {
      setItemErrors((prevState) => ({ ...prevState, description: 'Field is required' }));
    }

    if (formItems.image.trim().length === 0) {
      setItemErrors((prevState) => ({ ...prevState, image: 'Field is required' }));
    }

    if (formItems.price === null) {
      setItemErrors((prevState) => ({ ...prevState, price: 'Field is required' }));
    }

    if (
      formItems.name.trim().length === 0
      || formItems.description.trim().length === 0
      || formItems.image.trim().length === 0
      || formItems.price.length === null
    ) {
      return;
    }
    if (isEdit) {
      saveProduct(id,formData).then(() => {
        redirectToProductsList();
      }).catch(({ response }) => {
        setItemErrors(response.data);
      });
      return;
    }

    ApiClient.post("/api/product", JSON.stringify(formData)).then(() => {
        redirectToProductsList();
      })
      .catch(({ response }) => {
        setItemErrors(response.data);
      });
  };

  const hasSharedError = (field) => !!itemErrors[field];

  const getSharedErrorMessage = (field) => {
    if (!itemErrors[field]) {
      return '';
    }

    return itemErrors[field];
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
                value={formItems.name}
                error={hasSharedError('name')}
                helperText={getSharedErrorMessage('name')}
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
                value={formItems.price == null ? '' : formItems.price}
                id="price"
                label="Price"
                error={hasSharedError('price')}
                helperText={getSharedErrorMessage('price')}
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
                value={formItems.description}
                error={hasSharedError('description')}
                helperText={getSharedErrorMessage('description')}
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
                value={formItems.image}
                error={hasSharedError('image')}
                helperText={getSharedErrorMessage('image')}
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
               {!isEdit
                ? <Typography>CREATE</Typography>
                : <Typography>SAVE</Typography>}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ProductsForm;
