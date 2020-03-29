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
    if(this.state.query !== prevState.query){
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
            {console.log(searchbooks)}
            <ol className="books-grid">

                    {searchbooks.map((book) => (
                      console.log(book.pageCount)
                        // <li key={book.keys()}>
                        // <div className="book">
                        //     <div className="book-top">
                        //         <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}>

                        //         </div>
                        //         <div className="book-shelf-changer">
                        //             <select>
                        //                 <option value="move" disabled>Move to...</option>
                        //                 <option value="currentlyReading">Currently Reading</option>
                        //                 <option value="wantToRead">Want to Read</option>
                        //                 <option value="read">Read</option>
                        //                 <option value="none">None</option>
                        //             </select>
                        //         </div>
                        //     </div>
                        //     <div className="book-title">To Kill a Mockingbird</div>
                        //     <div className="book-authors">Harper Lee</div>
                        // </div>
                        // </li>         
                    ))}
                </ol>
            {/* <SearchBooksList searchresult={searchbooks}/> */}
          </div>
        </div>
      )
  }
}

export default CreateSearchPage;