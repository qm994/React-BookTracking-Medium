import React, { Component } from "react";

class SearchBooksList extends Component {
    
    render(){
        const booklist = this.props;
        console.log(`the new props data is ${this.props.searchresult}`)
        return(
            <ol className="books-grid">
                {this.props.searchresult.map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193,
                                     backgroundImage: `url(${book.imageLinks.thumbnail})`}}>

                                </div>
                                <div className="book-shelf-changer">
                                    <select>
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