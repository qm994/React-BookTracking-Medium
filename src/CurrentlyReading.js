import React from "react";

class CurrentlyReading extends React.Component{

    // componentDidUpdate(prevProps){
        
    // };
    

    render(){
        const books = this.props.readingBooks;
        console.log(books)
        // console.log(books[["Entries"]]);
        console.log(typeof(books));
        let KEYS = [];
        let VALUES = [];
        for (const book of books) {
            
            let [key, value] = book;
            console.log(key, value);
            KEYS.push(key);
            VALUES.push(value);
            
        }

        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">  
                        {this.props.readings.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193,
                                            backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                                        </div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => this.props.onChange(event, book)}>
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
                  </div>
                </div>
        )
    }
};

export default CurrentlyReading;
