let myLibrary = [];

class Book {
  constructor(author, title, numberOfPages, isRead) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
  }
}

function showBooks() {
  // Clear table
  document.querySelectorAll(".book-tr").forEach((tableRow) => {
    tableRow.remove();
  });
  // Create new table
  myLibrary.forEach((book, index) => {
    if (book == undefined) return 0;
    let table = document.querySelector("table");
    let tablerow = document.createElement("tr");
    tablerow.classList.add("book-tr");

    Object.keys(book).forEach((key) => {
      let tabledata = document.createElement("td");
      tablerow.appendChild(tabledata);
      tabledata.textContent = book[key];
    });

    removeButton = document.createElement("button");
    removeButton.textContent = "remove";

    removeButton.addEventListener("click", function () {
      delete myLibrary[index];
      showBooks();
    });

    changeReadButton = document.createElement("button");
    changeReadButton.textContent = "Change read status";

    changeReadButton.addEventListener("click", function () {
      myLibrary[index].isRead = !myLibrary[index].isRead;
      showBooks();
    });

    tablerow.append(removeButton, changeReadButton);

    table.appendChild(tablerow);
  });
}

function addBookToLibrary(author, title, num, isRead) {
  myLibrary.push(new Book(author, title, num, isRead));
  showBooks();
}

document.addEventListener("DOMContentLoaded", function () {
  newBookButton = document.querySelector("#add");
  formDiv = document.createElement("div");
  formDiv.classList.add("form-div");
  // Create a form on button hit
  newBookButton.addEventListener("click", function () {
    document.querySelector("body").appendChild(formDiv);
    document.querySelector(".form-div").innerHTML = `
            <form id='new-book'>
            Book name:
                <input id='book-name'>  <br>
            Author:
                <input id='book-author'>  <br>
            Number of pages:
                <input id='book-pages'>  <br>
            Read or not?
                <input id='book-read' type='checkbox'> 
                <button type='submit'>Submit a book</button>
            </form>   
        `;
    newBookButton.style.display = "none";
  });
  // Handle form submition
  formDiv.addEventListener("submit", function (event) {
    // makes sure form submition doesn't update the page
    event.preventDefault();

    isReadForm = document.querySelector("#book-read");
    let isRead = false;
    if (isReadForm.checked) isRead = true;

    addBookToLibrary(
      document.querySelector("#book-name").value,
      document.querySelector("#book-author").value,
      document.querySelector("#book-pages").value,
      isRead
    );
    newBookButton.style.display = "";
    formDiv.remove();
  });
});
