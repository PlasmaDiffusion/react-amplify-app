import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Match,
  useParams,
  useHistory,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./components/Home";
import { useAuth0 } from "@auth0/auth0-react";
//import "./App.css";

export default function BasicExample() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Shopping Site</title>
      </Helmet>

      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </React.Fragment>
  );
}
