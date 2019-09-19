// Get references to page elements
var $bookTitle = $("#book-title");
var $bookAuthor = $("#book-author");
var $bookIsbn = $("#book-isbn");
var $bookReview = $("#book-review");


var $submitBtn = $("#submit");
var $bookList = $("#book-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBook: function(book) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/books",
      data: JSON.stringify(book)
    });
  },
  getBooks: function() {
    return $.ajax({
      url: "api/books",
      type: "GET"
    });
  },
  deleteBook: function(id) {
    return $.ajax({
      url: "api/books/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshBooks = function() {
  API.getBooks().then(function(data) {
    var $books = data.map(function(book) {
      var $a = $("<a>")
        .text(book.title)
        .attr("href", "/book/" + book.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": book.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $bookList.empty();
    $bookList.append($books);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var book = {
    title: $bookTitle.val().trim(),
    author: $bookAuthor.val().trim(),
    isbn: $bookIsbn.val().trim(),
    review: $bookReview.val().trim()
  };

  if (!(book.title && book.author && book.isbn && book.review)) {
    alert("You must complete all forms to enter a book into the database!!");
    return;
  }

  API.saveBook(book).then(function() {
    refreshBooks();
  });

  $bookTitle.val("");
  $bookAuthor.val("");
  $bookIsbn.val("");
  $bookReview.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteBook(idToDelete).then(function() {
    refreshBooks();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$bookList.on("click", ".delete", handleDeleteBtnClick);
