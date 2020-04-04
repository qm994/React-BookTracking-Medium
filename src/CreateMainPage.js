import React from "react";
import CurrentlyReading from "./CurrentlyReading"; 
import wantToRead from "./WantToRead";
import WantToRead from "./WantToRead";
import Read from "./Read";
import * as BooksAPI from "./BooksAPI";

class CreateMainPage extends React.Component{

    // update the book shelve
    updateBookStatus = (event, book) => {
        const newShelve = event.target.value;
        const bookObj = {
            id: book.id,
            imageURL: book.imageLinks.thumbnail,
            title: book.title,
            authors: book.authors
        };
        BooksAPI.update(bookObj, newShelve) 
            .then((update) => (
                // will return an object with 3 shelve arrays inside and 
                // inside each array: there will be ids for each shelve books;
                //alert(update)
                console.log(update)
            ));
    };

   
    render(){
        // // const {readings, wantRead, read} = this.props;
        const readings = this.props.currentlyReading;
        const wantRead = this.props.wantToRead;
        const read = this.props.read;
        const readingBooks = this.props.readingBooks;

        console.log(`let see if readings change: ${this.props.readingBooks}`)
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading readings={readings} onChange={this.updateBookStatus} readingBooks={readingBooks}/>
                <WantToRead wantRead={wantRead} onChange={this.updateBookStatus}/>
                <Read read={read} onChange={this.updateBookStatus}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )
    }
};

export default CreateMainPage;