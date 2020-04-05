# MyReads Project


## TL;DR

To get started developing right away:

* firstly clone the `master` repo;
* then install all project dependencies with `npm install`
* finally start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with the app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. 
    ├── App.js # This is the root of the app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── CreateMainPage.js # Component to create the Main Page;
    ├── CreateSearchPage.js # Component to create the Search Page;
    ├── CurrentlyReading.js # Component for currentlyReading shelf;
    ├── WantToRead.js # Component to create wantToRead shelf;
    ├── read.js # Component to create the read shelf
    ├── ErrorBoundary.js # The error boundaries class for search page component;
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
## Details of Components && Logic

### CreateMainPage Component

It create the main page;

It takes the props (1)`currentlyReading`: all the currently readings book in currentlyReading state;
(2) `readingsId`: all the currently readings books ids;
and the rest pros `wantToRead`, `wantReadId`, `read`, `readId` all are the same logic;

And the prop: `onChange=this.updateBookStatus` will be used as the select tag's onChange event to update the book status and set the Id states;

### CreateSearchPage Component

It creates the search page;

The prop: `onChange=this.updateBookStatus` will be used as the select tag's onChange event to update the book status and set the Id states;

The props `onChangeSearchBook={this.onChangeSearchBook` will be used to update every book's dropdown selection when we do the search;

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
