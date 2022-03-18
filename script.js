let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.hasRead = function () {
  if (this.read) {
    console.log("has read");
  } else {
    console.log("hasnt read");
  }
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("hobbit", "rl stine", 33, true);
addBookToLibrary("hobewbit", "rewrl stine", 343, false);
