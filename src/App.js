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
    currentlyReading: [],
    readingBooks: {},
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

  // bookShelfMap = (books, shelf) => {
  //   const readings = books.filter(book => book.shelf === shelf);
  //   const readingsId = readings.map(book => book.id);
  //   const readingBooks = new Map();
  //   for(let i = 0; i < readingsId.length; i++){
  //     readingBooks.set(readingsId[i], readings[i]);
  //   };
  // }

  // get all the books in main page Component insert into the DOM tree
  componentDidMount(){
    BooksAPI.getAll()
        .then((books) => {
            console.log(books);

            // Map for currentlyReading;
            const readings = books
              .filter(book => book.shelf === "currentlyReading");
            const readingsId = readings.map(book => book.id);
            const readingBooks = new Map();
            for(let i = 0; i < readingsId.length; i++){
              readingBooks.set(readingsId[i], readings[i]);
            };

            // Map for wantToRead;
            const wantRead = books
              .filter(book => book.shelf === "wantToRead")
            const wantReadId = wantRead.map(book => book.id);
            const wantReadBooks = new Map();
            for(let i = 0; i < wantReadId.length; i++){
              wantReadBooks.set(wantReadId[i], wantRead[i])
            };
            console.log(wantReadBooks);

            // Map for read;
            const read = books
              .filter(book => book.shelf === "read"); 
            const readId = read.map(book => book.id);
            const readBooks = new Map();
            for(let i = 0; i < readId.length; i++){
              readBooks.set(readId[i], read[i])
            };
            console.log(readBooks);

            this.setState(() => ({
              currentlyReading: readings,
              readingBooks: readingBooks,
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
          readingBooks={this.state.readingBooks}
          readingsId={this.state.readingsId}
          wantToRead={this.state.wantToRead}
          read={this.state.read}
          />)
          }
      </div>
    )
  }
}

export default BooksApp
