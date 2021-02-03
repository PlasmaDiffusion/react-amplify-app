import React, { Component } from "react";
import { getClientUrl, getServerUrl } from "../../getUrl.js";
import SearchResult from "../searchComponents/searchResult";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import axios from "axios";

//The search bar that is always at the top of the site. You can enter keywords and select item categories with it.
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: "",
      category: "All",
      results: [],
      dropdownOpen: false,
      categories: [],
    };

    this.updateSearchBar = this.updateSearchBar.bind(this);
    this.confirmSearch = this.confirmSearch.bind(this);
    this.listResults = this.listResults.bind(this);
    this.toggle = this.toggle.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  //Search for stuff on mount (If there's search keywords in the url that is)
  componentDidMount() {
    var url = new URLSearchParams(window.location.search);
    var keywords = url.get("search");
    var categories = url.get("categories");

    //Search values to default to when nothing is entered
    if (!keywords) keywords="default";
    if (!categories) categories="All";

    //If keywords were entered and this component has the showResults flag, try searching for items from the server.
    if (this.props.searchResults && keywords) {
      //Find all items by default if you click catalogue
      if (keywords == "default" && categories == "All")
        axios.get(getServerUrl() + "/read/shopItems/").then((res) => {
          this.setState({ results: res.data });
        });
      else if (keywords == "default")
        axios.get(getServerUrl() + "/read/shopItems/"+ categories).then((res) => {
          this.setState({ results: res.data });
        });
      else
        axios
          .get(
            getServerUrl() + "/read/shopItems/" + keywords + "/" + categories
          )
          .then((res) => {
            this.setState({
              results: res.data,
            });
          });
    }

    //Don't actually show default in the search bar
    if (!keywords || keywords == "default") keywords = "";

    //Set previous search values
    this.setState({
      keywords: keywords,
      category: categories,
    });

    //Get all categories the user can pick
    axios.get(getServerUrl() + "/read/categories/").then((res) => {
      this.setState({ categories: res.data });
    });
  }

  //Start searching (Manually replace so you can have categories)
  confirmSearch(e) {
    e.preventDefault();

    window.location.replace(
      (this.props.admin ? "/admin/search" : "/search") +
        "/?search=" +
        this.state.keywords +
        "&categories=" +
        this.state.category
    );
  }

  //List all products found in the search here
  listResults() {
    const listItems = this.state.results.map((product, index) => (
      <div className="col">
        <SearchResult product={product} admin={this.props.admin} />
      </div>
    ));

    return (
      <div className="container">
        <div className="row">{listItems}</div>
      </div>
    );
  }

  //Enter stuff to search for
  updateSearchBar(e) {
    this.setState({ keywords: e.target.value });
  }

  //Dropdown to select category
  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  getCategories() {
    const categories = this.state.categories.map((category, index) => (
      <div
        className="dropdown-item"
        onClick={() => this.selectCategory(category.name)}
      >
        {category.name}
      </div>
    ));

    return categories;
  }

  selectCategory(e) {
    this.setState({ category: e });
  }

  //Dropdown, followed by search field, followed by search results
  render() {
    return this.props.searchResults ? (
      <div>{this.listResults()}</div>
    ) : (
      <React.Fragment>
        <form onSubmit={this.confirmSearch}>
          <div className="container">
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-">
                <Dropdown
                  id="dropdown"
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret>{this.state.category}</DropdownToggle>
                  <DropdownMenu>{this.getCategories()}</DropdownMenu>
                </Dropdown>
              </div>
              <div className="col-lg-7 " style={{ padding: 0 }}>
                <div className="form-group">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search for products..."
                    onChange={this.updateSearchBar}
                    value={this.state.keywords}
                    className="searchbar"
                  ></input>
                </div>
              </div>
              <div className="col-sm-">
                <button
                  type="submit"
                  id="searchButton"
                  value=" "
                  className="btn btn-primary"
                
                >
                <img src="https://img.icons8.com/search" style={{width:"16px", height:"16px"}} />

                </button>
                
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
