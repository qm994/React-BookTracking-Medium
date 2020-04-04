import React, { Component } from "react";

class SearchBooksList extends Component {
    
    updateBookStatus = (event, book) => {
        const val = event.target.value;
        
        const bookObj = {
            id: book.id,
            imageURL: book.imageLinks.thumbnail,
            title: book.title,
            authors: book.authors
        };
        this.props.moveToReading(bookObj);
        console.log(bookObj)
    }

    render(){
        console.log(`the new props data is ${this.props.searchresult}`)
        return(
            <ol className="books-grid">
                {(this.props.searchresult) && 
                this.props.searchresult.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193,
                                     backgroundImage: `url(${book.imageLinks.thumbnail})`}}>

                                </div>
                                <div className="book-shelf-changer">
                                    <select onChange={(event) => this.updateBookStatus(event, book)}>
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