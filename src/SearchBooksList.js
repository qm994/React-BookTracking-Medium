import React, { Component } from "react";

class SearchBooksList extends Component {
    errorHandling = (book) => {
        if(book.imageLinks.thumbnail === undefined){
            console.log(book.imageLinks.thumbnail === undefined)
        }
    };

    render(){
        return(
            <ol className="books-grid">
                {(this.props.searchresult) && 
                this.props.searchresult.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193,
                                     backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})`}}>
                                </div>
                                <div className="book-shelf-changer">
                                    <select value={this.props.onChangeSearchBook(book)} onChange={(event) => this.props.onChange(event, book)}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                        </li>         
                    ))
                }
                </ol> 

        )
    }
}

export default SearchBooksList;