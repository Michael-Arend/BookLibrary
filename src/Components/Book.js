import React from "react";

const Book = ({ book, HandleShelfChanged, shelfs }) => {
  const ChangeShelf = (event) => {
    HandleShelfChanged(book, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks !== undefined && book.imageLinks !== null
                ? book.imageLinks.smallThumbnail
                : ""
            })`,
          }}
        />
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={ChangeShelf}>
            <option value="move" disabled>
              "Move to..."
            </option>

            {shelfs.map((shelf) => {
              return (
                <option key={shelf.value} value={shelf.value}>
                  {shelf.displayText}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <ul className="authors-list">
        {book.authors !== undefined &&
          book.authors.map((a) => (
            <li key={a}>
              {" "}
              <div className="book-authors">{a}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Book;
