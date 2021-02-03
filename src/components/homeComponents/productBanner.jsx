import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { getClientUrl } from "../../getUrl";

//A "banner" that shows information on a product, passed in as a prop.
//(Needs to check for props, as the featuredProducts component gets them asynchrously)
const ProductBanner = (props) => {


  function getURL(){ return getClientUrl() + "/product/?id=" + props.product.id};

  return (
    <React.Fragment>

        {props.product ? (

          <div className="container">
            <div className={props.className} >
                <div className="col-md-6">
                  <a href={getURL()}>
                    <img src={props.product.imageLink}  className="center"></img>
                  </a>
                </div>
                  <div className="col-sm-4 featuredDescription d-flex align-items-center justify-content-center">
                    <h3>{props.product.name}</h3>
                    {/*<p>{props.product.description}</p>*/}
                    <br></br><br></br>
                </div>
                <div className="col-sm-1 featuredDescription d-flex align-items-center justify-content-center">
                  <a className="btn-round" href={getURL()}>BUY</a>
                  <p style={{fontSize:"1.5rem"}}>${props.product.price}</p>

                </div>
            </div>
          </div>
               

        ) : ""}
       
      
    </React.Fragment>
  );
};

export default ProductBanner;
