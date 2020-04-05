import React from 'react'
//import * as BooksAPI from './BooksAPI'
import './App.css';
import CreateSearchPage from "./CreateSearchPage";
import CreateMainPage from "./CreateMainPage";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // allbooks array state used to store all books in main page
    currentlyReading: [],
    readingsId: [],
    //
    wantToRead: [],
    wantReadId: [],
    //
    read: [],
    readId: [],
    //
    hasError: false
  };

  static getDerivedStateFromError(error) {
    return{hasError: true}
  };

  // set the select tag defualt in search page
  onChangeSearchBook = (book) => {
    if(this.state.readingsId.includes(book.id)){
      return("currentlyReading")
    } else if(this.state.wantReadId.includes(book.id)){
      return("wantToRead")
    } else if(this.state.readId.includes(book.id)){
      return("read")
    } else{
      return("none")
    }
  };

  // get all the books in main page Component insert into the DOM tree
  getAll = () => {
    BooksAPI.getAll()
        .then((books) => {
            //currentlyReading;
            const readings = books
              .filter(book => book.shelf === "currentlyReading");
            const readingsId = readings.map(book => book.id);
           
            const wantToRead = books
              .filter(book => book.shelf === "wantToRead")
            const wantToReadId = wantToRead.map(book => book.id);
            
            const read = books
              .filter(book => book.shelf === "read"); 
            const readId = read.map(book => book.id);
           
            this.setState(() => ({
              currentlyReading: readings,
              readingsId: readingsId,
              //
              wantToRead: wantToRead,
              wantReadId: wantToReadId,
              //
              read: read,
              readId: readId
            })
            );
        })
        .catch((error) => {
            alert("Something Went Wrong!")
        })
  };

  componentDidMount(){
    this.getAll()
  };

  // happened when ids changed 
  componentDidUpdate(prevProps, prevState){
    if(
      JSON.stringify(prevState.readingsId) !== JSON.stringify(this.state.readingsId)
      ||
      JSON.stringify(prevState.wantToReadId) !== JSON.stringify(this.state.wantToReadId)
      ||
      JSON.stringify(prevState.readId) !== JSON.stringify(this.state.readId)
      ){
      console.log("hahahhahaha")
      this.getAll()
    } 
  }

  updateBookStatus = (event, book) => {
    const newShelve = event.target.value;
    const options = event.target.options;
    options[options.selectedIndex].setAttribute('selected', true);
    const bookObj = {
        id: book.id,
        imageURL: book.imageLinks.thumbnail,
        title: book.title,
        authors: book.authors
    };
    BooksAPI.update(bookObj, newShelve) 
        .then((update) => {
            // will return an object with 3 shelve arrays inside and 
            // inside each array: there will be ids for each shelve books;
            //alert(update)
            this.setState(() => ({
                readingsId: update.currentlyReading,
                wantToReadId: update.wantToRead,
                readId: update.read
            }));
                    
        });
};


  render() {
    console.log(this.state.wantToReadId)
    return (
      <div className="app">
            <Route exact path="/"
              render = {() => (
                <CreateMainPage 
                // currentlyReading={this.state.currentlyReading}
                currentlyReading={this.state.currentlyReading}
                readingsId={this.state.readingsId}
                wantToRead={this.state.wantToRead}
                wantReadId={this.state.wantToReadId}
                read={this.state.read}
                readId={this.state.readId}
                allBooks={this.state.allBooks}
                onChange={this.updateBookStatus}
                getAll={this.getAll}  
          />)}
        />  

          <Route path = "/search" 
            render = {() => (
              <CreateSearchPage
              currentlyReading={this.state.currentlyReading}
              onChange={this.updateBookStatus}
              onChangeSearchBook={this.onChangeSearchBook}
           />)}
          />  
      </div>

    )
  }
}

export default BooksApp
