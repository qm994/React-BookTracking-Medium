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
    readingsId: [],
    //
    wantToRead: [],
    wantReadId: [],
    //
    read: [],
    readId: [],
    //
    allBooks: new Map()
  };

  // used to return main page
  changeSearchPage = () => {
    this.setState(() => ({
      showSearchPage: false
    }))
  };

  changeMainPage = () => {
    this.setState(() => ({
      showSearchPage: true
    }))
  }

  // update the currentlyReading state
  onChangeReadingOnes = (newone) => {
    // this.setState((currentState) => ({
    //   currentlyReading: [...currentState.currentlyReading, newone]
    // }))
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
    if(JSON.stringify(prevState.readingsId) !== JSON.stringify(this.state.readingsId) && prevState.readingsId !== ""){
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
    };
    BooksAPI.update(bookObj, newShelve) 
        .then((update) => {
            // will return an object with 3 shelve arrays inside and 
            // inside each array: there will be ids for each shelve books;
            //alert(update)
            this.setState(() => ({
                readingsId: update.currentlyReading,
                wantToReadId: update.wantToRead
            }))
                    
        });
};


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage 
        ? (<CreateSearchPage
           clickfunc={this.changeSearchPage}
           currentlyReading={this.state.currentlyReading}
           onChangeReadingOnes={this.onChangeReadingOnes}
           />) 

        : (<CreateMainPage 
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
          changeMainPage={this.changeMainPage}
          />
          )
          }
      </div>

    )
  }
}

export default BooksApp
