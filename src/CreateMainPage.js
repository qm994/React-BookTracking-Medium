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
                            

            });
    };

   
    render(){
        // // const {readings, wantRead, read} = this.props;
        const currentlyReading = this.props.currentlyReading;
        const wantToRead = this.props.wantToRead;
        const read = this.props.read;
        const allBooks = this.props.allBooks;

        const readingsId = this.props.readingsId;
        const wantToReadId = this.props.wantToReadId;
        const readId = this.props.readId;

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                 onChange={this.props.onChange}
                 readingBooks={currentlyReading}
                 readingsId={readingsId} 
                 getAll={this.props.getAll}/>

                <WantToRead
                 onChange={this.props.onChange}
                 wantToRead={wantToRead} 
                 wantToReadId={wantToReadId}
                 getAll={this.props.getAll}/>

                <Read read={read} onChange={this.updateBookStatus}/>
              </div>
            </div>
            
            <div className="open-search">
              <button onClick={this.props.changeMainPage}>Add a book</button>
            </div>
          </div>
        )
    }
};

export default CreateMainPage;