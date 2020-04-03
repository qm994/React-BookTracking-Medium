import React from "react";
import CurrentlyReading from "./CurrentlyReading"; 
import wantToRead from "./WantToRead";
import WantToRead from "./WantToRead";
import Read from "./Read";

class CreateMainPage extends React.Component{
    
    render(){
        // // const {readings, wantRead, read} = this.props;
        const readings = this.props.currentlyReading;
        const wantRead = this.props.wantToRead;
        const read = this.props.read;

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading readings={readings}/>
                <WantToRead wantRead={wantRead}/>
                <Read read={read}/>
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