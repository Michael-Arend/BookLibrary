import Book from "./Book";

const BookShelf = ({ books, HandleShelfChanged, shelfs, shelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.displayText}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.title}>
              <Book
                book={book}
                HandleShelfChanged={HandleShelfChanged}
                shelfs={shelfs}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
