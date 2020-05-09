import axios from "../../node_modules/axios";
const apiEndPoint = "http://localhost:3000/product";

const getAllProductsApiEndPoint = "http://localhost:3000/product";
export async function GetAllProducts(skip, limit, sortBy, sdir) {
  const api = sortBy
    ? `${getAllProductsApiEndPoint}?limit=${limit}&skip=${(skip - 1) *
        limit}&sortBy=${sortBy}&sdir=${sdir}`
    : limit
    ? `${getAllProductsApiEndPoint}?limit=${limit}&skip=${(skip - 1) * limit}`
    : getAllProductsApiEndPoint;

  const { data } = await axios.get(api);
  return data;
}

const catEndPoint = "http://localhost:3000/categories";
export async function GetFilteredProducts(skip, limit, id, sortBy) {
  const endPoint = sortBy
    ? `${catEndPoint}/cat/${id}?limit=${limit}&skip=${(skip - 1) *
        limit}&sortBy=${sortBy}`
    : `${catEndPoint}/cat/${id}?limit=${limit}&skip=${(skip - 1) * limit}`;
  const { data } = await axios.get(endPoint);
  return data[0].products;
}

export async function GetById(id) {
  const { data } = await axios.get(`${apiEndPoint}/${id}`);
  return data;
}

const addProductApiEndPoint = "http://localhost:3000/product/add";
export const productAdd = async function(item) {
  try {
    const { data } = await axios.post(addProductApiEndPoint, item, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

export const Delete = async id => {
  await axios.delete(`${apiEndPoint}/${id}`);
};

export const UploadImage = async function(item) {
  let formData = new FormData();
  formData.append("photo", item);
const { data } = await axios.post("http://localhost:3000/product/upload", formData);
  return data;
};
