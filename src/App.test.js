import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow, mount } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import Loading from "./components/loading";
import SearchBar from "./components/searchComponents/searchBar";
import ProductPage from "./components/productPage";
import Cart from "./components/cartComponents/cart";
import SearchResult from "./components/searchComponents/searchResult";
import QuantityButtons from "./components/quantityButtons";
import FeaturedProducts from "./components/homeComponents/featuredProducts";

configure({ adapter: new Adapter() });

const clickSpy = sinon.spy();

/*
//Loading component
describe("Loading component", function () {
  it("renders a basic loading <p> message", function () {
    const container = shallow(<Loading />);
    const msg = <p>Loading...</p>;
    expect(container.find("p").length).to.equal(1);
  });
});

//Profile component
describe("Profile component", function () {
  it("renders a name in h2, but not when logged in", function () {
    const container = shallow(<Loading />);
    expect(container.find("h2").length).to.equal(0);
  });
});*/

//Product
describe("Product Page component", function () {
  it("renders an apple if id is 1", async function () {
    const wrapper = shallow(<ProductPage />);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(wrapper.state().loaded).to.equal(true);
    const name = <h2>Apple</h2>;
    expect(wrapper.contains(name)).to.equal(true);
  });
});

//Cart
describe("Cart component", function () {
  it("should have at least two items", async function () {
    const wrapper = shallow(<Cart test={true} />);

    expect(wrapper.find("div")).to.have.lengthOf(5);
  });
});

//Quantity buttons
/*describe("Quanity button component", function () {
  it("should have two buttons", function () {
    const wrapper = shallow(<QuantityButtons amount={1} max={2} />);

    expect(wrapper.find("button")).to.have.lengthOf(2);
  });

  it("should be clickable", async function () {
    const wrapper = shallow(
      <QuantityButtons amount={1} max={2} onAmountChanged={() => {}} />
    );

    wrapper.find("#increment").simulate("click");
    expect(clickSpy.calledOnce).to.equal(true);
  });
});*/

//Homepage
describe("Featured Products component", function () {
  it("should have three items", async function () {
    const wrapper = shallow(<FeaturedProducts />);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(wrapper.state().product0).to.not.equal(null);
    expect(wrapper.state().product1).to.not.equal(null);
    expect(wrapper.state().product2).to.not.equal(null);
  });
});

//Search bar
describe("Searchbar", function () {
  it("should read in multiple categories", async function () {
    const container = shallow(<SearchBar />);

    //await container.instance().componentDidMount();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(container.state().categories.length).to.be.greaterThan(1);

    //container.find("#searchButton").simulate("click");
    //expect(clickSpy.calledOnce).to.equal(true);
    //expect(container.find("#searchButton")).to.equal(true);
  });
});
