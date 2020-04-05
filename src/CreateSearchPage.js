import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import SearchBooksList from "./SearchBooksList";
import ErrorBoundary from "./ErrorBoundary";
import { Link } from "react-router-dom";

class CreateSearchPage extends Component{
  state={
    query: "",
    // store all search books object
    searchbooks: [],
    hasError: false
  };

  updateQuery = (event) => {
    const val = event.target.value;
    this.setState(()=> ({
      query: val
    }));
  };

  componentDidUpdate(prevProps, prevState){
    if(this.state.query !== prevState.query){
      if(this.state.query == ""){
        this.setState(() => ({
          searchbooks: []
        }))
      } else{
        BooksAPI.search(this.state.query)
        .then((books) => {
          !books.error &&  
          this.setState(() => ({
            searchbooks: books
          }))
        })
        .catch((err) => {
          this.setState((currentState) => ({
            searchbooks: currentState.searchbooks
          }))
        });
      }
    }
  };

  render(){
    console.log("this search book is");
    console.log(this.state.searchbooks);

    const {query, searchbooks} = this.state;
      return(
        <div className="search-books">
          <div className="search-books-bar">
            {/* <button className="close-search" onClick={this.props.clickfunc}>Close</button> */}
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
                value={query} onChange={this.updateQuery}/>

            </div>
          </div>
          <div className="search-books-results">
            {
              <ErrorBoundary>
                <SearchBooksList
                searchresult={searchbooks}
                readingOnes={this.props.currentlyReading}
                onChange={this.props.onChange}
                onChangeSearchBook={this.props.onChangeSearchBook}
                />
              </ErrorBoundary>
            }
          </div>
        </div>
      )

  }
}

export default CreateSearchPage;