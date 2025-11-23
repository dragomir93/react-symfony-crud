import ApiClient from '../../../api/ApiClient';

const getProducts = () => new Promise((resolve, reject) => {
  ApiClient.get('/api/products').then(({ data }) => {
    resolve(data);
  }).catch((err) => {
    reject(err);
  });
});

const getProductData = (id) => new Promise((resolve, reject) => {
  ApiClient.get(`/api/product/${id}`).then(({ data }) => {
    resolve(data);
  }).catch((err) => {
    reject(err);
  });
});

const removeProduct = (id) => new Promise((resolve, reject) => {
  ApiClient.delete(`/api/product/${id}`).then(({ data }) => {
    resolve(data);
  }).catch((err) => {
    reject(err);
  });
});

const saveProduct = (
  id,
  formData,
) => new Promise((resolve, reject) => {
  ApiClient.post(
    `/api/product/${id}`,
    formData,
  ).then(({ data }) => {
    resolve(data);
  }).catch((err) => {
    reject(err);
  });
});

export {
  getProducts,
  getProductData,
  removeProduct,
  saveProduct,
};
