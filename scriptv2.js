"use strict";

const $ = (selector) => {
  return document.querySelector(selector);
};

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.hasRead = function () {
  return this.read;
};

const addBook = $(".add-header");
const popUp = $(".pop-up");
const popUpBlur = $(".default-blur");

// new book input values
const title = $("#title");
const author = $("#author");
const pages = $("#pages");
const hasRead = $("#has-read");

// On submit, create book tile element with book info
popUp.addEventListener("submit", (e) => {
  if ((title.value === "") | (author.value === "") | (pages.value === "")) {
    e.preventDefault();
  } else {
    // pop up becomes invisible on submit
    popUp.classList.toggle("visibility");
    popUpBlur.classList.toggle("blur-toggle");

    addBookToLibrary(title.value, author.value, pages.value, hasRead.checked);
    e.preventDefault();
  }
});

// create book object and record new book info to tile element
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  addBookTile(newBook);
}

function addBookTile(book) {
  // create tile elements
  const bookItem = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const hasReadToggle = document.createElement("button");
  const removeBtn = document.createElement("button");

  // add classes to elements
  bookItem.classList.add("book-item");
  title.classList.add("book-title");
  author.classList.add("book-author");
  pages.classList.add("book-pages");
  removeBtn.classList.add("book-remove");

  // add required attribute to inputs
  title.attributes["required"] = "";
  author.attributes["required"] = "";
  pages.attributes["required"] = "";

  // add text to buttons
  removeBtn.textContent = "Remove";

  // add book info text to elements
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;

  // toggle 'has read' button
  if (book.hasRead()) {
    hasReadToggle.classList.toggle("has-read");
    hasReadToggle.textContent = "Read";
  } else {
    hasReadToggle.textContent = "Not Read";
  }

  // change toggle text on click
  hasReadToggle.addEventListener("click", () => {
    hasReadToggle.classList.toggle("has-read");
    if (hasReadToggle.textContent === "Read") {
      hasReadToggle.textContent = "Not Read";
    } else {
      hasReadToggle.textContent = "Read";
    }
  });

  // 'remove tile' button
  removeBtn.addEventListener("click", () => {
    bookItem.remove();
  });

  // add created tile to DOM
  bookItem.appendChild(title);
  bookItem.appendChild(author);
  bookItem.appendChild(pages);
  bookItem.appendChild(hasReadToggle);
  bookItem.appendChild(removeBtn);
  document.querySelector(".books").appendChild(bookItem);
}

// add book listener for pop up
addBook.addEventListener("click", () => {
  title.value = "";
  author.value = "";
  pages.value = "";
  popUp.classList.toggle("visibility");
  popUpBlur.classList.toggle("blur-toggle");
});
// exit pop up on click anywhere outside of pop up
popUpBlur.addEventListener("click", () => {
  popUp.classList.toggle("visibility");
  popUpBlur.classList.toggle("blur-toggle");
});
