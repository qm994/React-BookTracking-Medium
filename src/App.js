import React from 'react'
//import * as BooksAPI from './BooksAPI'
import './App.css';
import CreateSearchPage from "./CreateSearchPage";
import CreateMainPage from "./CreateMainPage";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    // allbooks array state used to store all books in main page
    allbooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  changeSearchPage = () => {
    this.setState(() => ({
      showSearchPage: false
    }))
  };

  // update the currentlyReading state
  onChangeReadingOnes = (newone) => {
    this.setState((currentState) => ({
      currentlyReading: [...currentState.currentlyReading, newone]
    }))
  };

  // get all the books in main page when page initialized
  componentDidMount(){
    BooksAPI.getAll()
        .then((books) => {
            console.log(books);
            const readings = books.filter(book => book.shelf === "currentlyReading");
            const wantRead = books.filter(book => book.shelf === "wantToRead");
            const read = books.filter(book => book.shelf === "read");

            this.setState(() => ({
              currentlyReading: readings,
              wantToRead: wantRead,
              read: read
            }));
        })
        .catch((error) => {
            alert("Something Went Wrong!")
        })
      };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage 
        ? (<CreateSearchPage
           clickfunc={this.changeSearchPage}
           readingOnes={this.state.currentlyReading}
           onChangeReadingOnes={this.onChangeReadingOnes}
           />) 

        : (<CreateMainPage 
          currentlyReading={this.state.currentlyReading}
          wantToRead={this.state.wantToRead}
          read={this.state.read}
          />)
          }
      </div>
    )
  }
}

export default BooksApp
