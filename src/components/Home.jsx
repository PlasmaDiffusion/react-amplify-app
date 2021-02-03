import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Match,
  useParams,
  useHistory,
} from "react-router-dom";

import AuthNav from "./navbar.jsx";
import Profile from "./profile.jsx";
import PrivateRoute from "./private-route.jsx";
import ExternalApi from "./external-api.jsx";
import ShopItemForm from "./adminComponents/shopItemForm";
import AdminNavigation from "./adminComponents/adminNavigation";
import AdminSearch from "./adminComponents/adminSearch";
import SearchBar from "./searchComponents/searchBar.jsx";
import ProductPage from "./productPage.jsx";
import Cart from "./cartComponents/cart.jsx";
import ProductCarousel from "./homeComponents/productCarousel";
import FeaturedProducts from "./homeComponents/featuredProducts.jsx";
import SupportPage from "./supportPage.jsx";

//All routes are placed here.
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <AuthNav title={"Home"} />
            <FeaturedProducts />
          </Route>
          <Route exact path="/search">
            <AuthNav title={"Catalogue"} />
            <SearchBar searchResults={true} />
          </Route>
          <Route exact path="/product">
            <AuthNav />
            <ProductPage />
          </Route>
          <Route exact path="/support">
            <AuthNav title={"Support"} />
            <SupportPage />
          </Route>
          {/* Private routes go below */}
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path="/cart">
            <AuthNav title={"Cart"}/>
            <Cart />
          </PrivateRoute>
          <PrivateRoute exact path="/api">
            <ExternalApi />
          </PrivateRoute>
          <PrivateRoute exact path="/admin">
            <AdminNavigation currentPage={"Add Product"} />
            <ShopItemForm updatingItem={false} />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/search">
            <AdminNavigation currentPage={"Find Products to Edit"} />
            <AdminSearch />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/update">
            <AdminNavigation />
            <ShopItemForm updatingItem={true} />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

export default Home;
