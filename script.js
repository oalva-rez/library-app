const $ = (selector) => {
  return document.querySelector(selector);
};

// open 'add book' pop up btn
const addBook = $(".add-header");

// pop-up elements
const popUp = $(".pop-up");
const popUpBlur = $(".default-blur");

// input elements
const title = $("#title");
const author = $("#author");
const pages = $("#pages");
const hasRead = $("#has-read");

// add book listener for pop up
addBook.addEventListener("click", () => {
  title.value = "";
  author.value = "";
  pages.value = "";
  popUp.classList.toggle("visibility");
  popUpBlur.classList.toggle("blur-toggle");
});

// On submit, create book tile element with book info
popUp.addEventListener("submit", (e) => {
  if ((title.value === "") | (author.value === "") | (pages.value === "")) {
    e.preventDefault();
  } else {
    // pop up becomes invisible on submit
    popUp.classList.toggle("visibility");
    popUpBlur.classList.toggle("blur-toggle");

    const book = new Book(
      title.value,
      author.value,
      pages.value,
      hasRead.value
    );

    book.addBookTile();
    e.preventDefault();
  }
});

// exit pop up on click anywhere outside of pop up
popUpBlur.addEventListener("click", () => {
  popUp.classList.toggle("visibility");
  popUpBlur.classList.toggle("blur-toggle");
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  addBookTile() {
    const bookItem = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const hasReadToggle = document.createElement("button");
    const removeBtn = document.createElement("button");
    bookItem.classList.add("book-item");
    title.classList.add("book-title");
    author.classList.add("book-author");
    pages.classList.add("book-pages");
    removeBtn.classList.add("book-remove");

    // 'remove' button
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      bookItem.remove();
    });

    // add book info text to elements
    title.textContent = this.title;
    author.textContent = this.author;
    pages.textContent = this.pages;

    // 'has read' 'hasnt read' checkbox logic
    if (hasRead.checked) {
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

    // append elements to wrapper and then to HTML
    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(pages);
    bookItem.appendChild(hasReadToggle);
    bookItem.appendChild(removeBtn);
    document.querySelector(".books").appendChild(bookItem);
  }
}
