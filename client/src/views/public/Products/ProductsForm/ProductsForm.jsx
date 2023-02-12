import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { publicRouteCodes } from "../../../../constants/RouteCodes";
import ApiClient from "../../../../api/ApiClient";
import { useNavigate, useParams } from "react-router-dom";
import { getProductData, saveProduct } from "../Api";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    image: null,
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
  
  const addImage = (event) => {
    const file = event.target.files;
    if (!file || !file[0]) {
      return;
    }
    handleFormItemsChange(file[0], 'image');
  };

  const handleSubmit = () => {
    const formData = { ...formItems };

    if (formItems.name.trim().length === 0){
      setItemErrors((prevState) => ({ ...prevState, name: 'Field is required' }));
    }

    if (formItems.description.trim().length === 0) {
      setItemErrors((prevState) => ({ ...prevState, description: 'Field is required' }));
    }

    // if (formItems.image.trim().length === 0) {
    //   setItemErrors((prevState) => ({ ...prevState, image: 'Field is required' }));
    // }

    if (formItems.price === null || formItems.price === '') {
      setItemErrors((prevState) => ({ ...prevState, price: 'Field is required' }));
    }

    if (
      formItems.name.trim().length === 0
      || formItems.description.trim().length === 0
      // || formItems.image.trim().length === 0
      || formItems.price.length === null
      || formItems.price === ''
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

    ApiClient.post("/api/product",formData,{ headers: 
      {'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',} }).then(() => {
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
        <Typography component="h1" variant="h5" color="primary" gutterBottom>
          Product {!isEdit ? "create" : "edit"}
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
              <Typography component="p" variant="p" color="default" gutterBottom>
                Add new image
              </Typography>
              <Button variant="contained" component="label">
                Upload &nbsp;<CloudUploadIcon/>
                <input hidden  accept="image/*" multiple type="file" onChange={(event) => {
                addImage(event);
              }}/>
              </Button>
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
