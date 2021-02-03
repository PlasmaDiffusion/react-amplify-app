import { getClientUrl, getServerUrl } from "../../getUrl.js";
import axios from "axios";

//Functions used to update/create products from the admin pages

//Get data to submit form arguments
export function submitProduct(state, user) {
  const shopItemToSubmit = {
    user: user,
    name: state.name,
    description: state.description,
    imageLink: state.imageLink,
    price: state.price,
    amountInStock: state.amountInStock,
    category: state.category,
  };

  axios
    .post(getServerUrl() + "/create/shopItem", shopItemToSubmit)
    .then((res) => {
      console.log(res.data);
      alert(res.data);
      window.location.replace(getClientUrl() + "/admin");
    });
}

//Get data to submit form arguments
export function updateProduct(state, id, user) {
  const shopItemToUpdate = {
    user: user,
    name: state.name,
    description: state.description,
    imageLink: state.imageLink,
    price: state.price,
    amountInStock: state.amountInStock,
    category: state.category,
  };

  axios
    .post(getServerUrl() + "/update/shopItem/" + id, shopItemToUpdate)
    .then((res) => {
      console.log(res.data);
      alert(res.data);
      window.location.replace(getClientUrl() + "/admin");
    });
}
