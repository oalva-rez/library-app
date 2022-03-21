"use strict";

let myLibrary = [];
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

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  addBookTile(newBook);
  myLibrary.push(newBook);
}

const addBook = $(".add-header");
const popUp = $(".pop-up");
const submitBook = $("#add-btn");
const popUpBlur = $(".default-blur");

addBook.addEventListener("click", () => {
  popUp.classList.toggle("visibility");
  popUpBlur.classList.toggle("blur-toggle");
});
popUpBlur.addEventListener("click", () => {
  popUp.classList.toggle("visibility");
  popUpBlur.classList.toggle("blur-toggle");
});
submitBook.addEventListener("click", () => {
  const title = $("#title");
  const author = $("#author");
  const pages = $("#pages");
  const hasRead = $("#has-read");

  popUp.classList.toggle("visibility");
  popUpBlur.classList.toggle("blur-toggle");

  addBookToLibrary(title.value, author.value, pages.value, hasRead.checked);
});

function addBookTile(book) {
  function setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
  const bookItem = document.createElement("div");
  setAttributes(bookItem, { class: "book-item" });

  const title = document.createElement("div");
  setAttributes(title, { class: "book-title" });
  title.textContent = book.title;

  const author = document.createElement("div");
  setAttributes(author, { class: "book-author" });
  author.textContent = book.author;

  const pages = document.createElement("div");
  setAttributes(pages, { class: "book-pages" });
  pages.textContent = book.pages;

  const hasReadToggle = document.createElement("button");
  if (book.hasRead()) {
    hasReadToggle.classList.toggle("has-read");
  }
  hasReadToggle.textContent = "Read";
  hasReadToggle.addEventListener("click", () => {
    hasReadToggle.classList.toggle("has-read");
  });
  const removeBtn = document.createElement("button");
  setAttributes(removeBtn, { class: "book-remove" });
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    bookItem.remove();
  });

  bookItem.appendChild(title);
  bookItem.appendChild(author);
  bookItem.appendChild(pages);
  bookItem.appendChild(hasReadToggle);
  bookItem.appendChild(removeBtn);
  document.querySelector(".books").appendChild(bookItem);
}
