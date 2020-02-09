import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "lastName",
    currentSort: "default",
    sortField: ""

  };

  // When this component mounts, search the Giphy API for pictures of kittens

  componentDidMount() {
    console.log("THIS IS THE VERY BENNING OF THE FUNCTON")
    API.search()
      .then(res => {
        this.setState({
          result: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            dob: e.age,
            key: i
          }))

        })
        console.log("&&&&&&&")
        this.testFunction()
      })
      .catch(err => console.log(err));
  }



  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.filterEmployees(this.state.search);
    // this.searchEmp(this.state.search);
  };

  testFunction = () => {
    { console.log("************") }
    { console.log(this.state.result[0].picture) }
    { console.log("+++++++++++++") }
  }

  render() {

    // const{ data } = this.state.result;
    //  const{ currentSort } = this.state;
    return (
      <div className="container">
        <div className="col-md-12">
          <div heading="Search">

            <SearchForm
              value={this.state.search}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="col-12">
              <tr>
                <th></th>
                <th>First Name</th>
                {/* <th onClick={this.onSortChange}>First Name   */}
                {/* <button onClick={this.onSortChange}> ^
								</button> */}
                {/* </th> */}
                <th>Last Name </th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
              {/* { [...this.state.result].sort(this.sortTypes[this.state.currentSort].fn).map((item) =>  */}
              {[...this.state.result].map((item) =>
                <EmployeeCard
                  picture={item.picture}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  phone={item.phone}
                  key={item.key}
                />
              )}

            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default SearchResultContainer;