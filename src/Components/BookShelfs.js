import React from "react";
import BookShelf from "./BookShelf";

import { useNavigate } from "react-router-dom";

const BookShelfs = ({ books, HandleShelfChanged, bookshelfs }) => {
  const navigate = useNavigate();

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookshelfs
            .filter((b) => b.value != "none")
            .map((shelf) => (
              <BookShelf
                key={shelf.value}
                books={books.filter((book) => book.shelf === shelf.value)}
                HandleShelfChanged={HandleShelfChanged}
                shelfs={bookshelfs}
                shelf={shelf}
              />
            ))}
        </div>
      </div>
      <div className="open-search">
        <button onClick={() => navigate("/Search")}>Add a book</button>
      </div>
    </div>
  );
};

export default BookShelfs;
