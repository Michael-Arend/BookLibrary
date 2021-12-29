import React, { Fragment, useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelfs from "./Components/BookShelfs";
import Search from "./Components/Search";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const bookshelfs = [
  { value: "currentlyReading", displayText: "Currently Reading" },
  { value: "wantToRead", displayText: "Want to Read" },
  { value: "read", displayText: "Read" },
  { value: "none", displayText: "None" },
];

const BooksApp = () => {
  const showSearchPage = false;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((b) => setBooks(() => b));
  }, []);

  const HandleShelfChanged = (book, newShellValue) => {
    const bookIndex = books.findIndex((b) => b.id === book.id);
    const prevBooks = { ...books };
    let newBooks = [...books];
    if (bookIndex === -1) {
      book.shelf = newShellValue;
      newBooks = [...newBooks, book];
    } else {
      newBooks[bookIndex] = { ...newBooks[bookIndex], shelf: newShellValue };
    }
    setBooks((prev) => newBooks);
    BooksAPI.update(book, newShellValue).catch((err) => {
      if (err !== undefined) {
        setBooks(prevBooks);
        console.log("an error has occured while updating the book shelf.");
      }
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <BookShelfs
              books={books}
              HandleShelfChanged={HandleShelfChanged}
              bookshelfs={bookshelfs}
            />
          }
        />

        <Route
          path="/Search"
          element={
            <Search
              books={books}
              HandleShelfChanged={HandleShelfChanged}
              shelfs={bookshelfs}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default BooksApp;
