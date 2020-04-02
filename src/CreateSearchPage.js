import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import SearchBooksList from "./SearchBooksList";


class CreateSearchPage extends Component{
  state={
    query: "",
    searchbooks: []
  };

  updateQuery = (event) => {
    const val = event.target.value;
    this.setState(()=> ({
      query: val.trim()
    }));
  };

  componentDidUpdate(prevProps, prevState){
    if(this.state.query !== prevState.query && this.state.query !== ""){
      BooksAPI.search(this.state.query)
        .then((books) => {
          this.setState(() => ({
            searchbooks: books
          }))
        })
    }
  };

  render(){
    const {query, searchbooks} = this.state;
    
      return(
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={this.props.clickfunc}>Close</button>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author"
                value={query} onChange={this.updateQuery}/>

            </div>
          </div>
          <div className="search-books-results">
            <SearchBooksList
             searchresult={searchbooks}
             readingOnes={this.props.readingOnes}
             moveToReading={this.props.onChangeReadingOnes}
              />
          </div>
        </div>
      )
  }
}

export default CreateSearchPage;