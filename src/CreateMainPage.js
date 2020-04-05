import React from "react";
import CurrentlyReading from "./CurrentlyReading"; 
import wantToRead from "./WantToRead";
import WantToRead from "./WantToRead";
import Read from "./Read";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class CreateMainPage extends React.Component{
    render(){
        // // const {readings, wantRead, read} = this.props;
        const currentlyReading = this.props.currentlyReading;
        const wantToRead = this.props.wantToRead;
        const read = this.props.read;

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

                <Read
                 onChange={this.props.onChange}
                 read={read}
                 readId={readId}
                 getAll={this.props.getAll}
                />
              </div>
            </div>
            
            <div className="open-search">
              {/* <button onClick={this.props.changeMainPage}>Add a book</button> */}
              <Link to="/search" className="toSearch">Add a Book</Link>
            </div>
          </div>
        )
    }
};

export default CreateMainPage;