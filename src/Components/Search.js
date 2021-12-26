import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as BooksAPI from "./../BooksAPI";
import Book from "./Book";

const Search = ({ books, HandleShelfChanged, shelfs }) => {
  const navigate = useNavigate();
  const inputField = useRef();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const searchTextTimer = setTimeout(async () => {
      await SearchForBooks();
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(searchTextTimer);
    };
  }, [searchText]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  const findShelf = (book) => {
    const bookIndex = books.findIndex((b) => b.id === book.id);
    book.shelf =
      bookIndex === -1
        ? (book.shelf = "none")
        : (book.shelf = books[bookIndex].shelf);
  };

  const SearchForBooks = async () => {
    if (searchText === "") {
      setFilteredBooks([]);
      return;
    }

    await BooksAPI.search(searchText).then((b) => {
      if (b !== undefined && b.length > 0) b.map((book) => findShelf(book));
      setFilteredBooks(() => (b.error === undefined ? b : []));
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button onClick={() => navigate("/")} className="close-search">
          Close
        </button>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search by title or author"
            ref={inputField}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {isLoading ? (
            <p>Loading...</p>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <li key={filteredBooks.findIndex((x) => x === book)}>
                <Book
                  book={book}
                  HandleShelfChanged={HandleShelfChanged}
                  shelfs={shelfs}
                />
              </li>
            ))
          ) : inputField.current === undefined ||
            inputField.current.value === "" ? (
            <p></p>
          ) : (
            <p>no book found</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Search;
