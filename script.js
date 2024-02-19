let library = [];
const addButton = document.querySelector(".addButton");
const form = document.querySelector(".bookDetails");
const submitButton = document.querySelector(".submit");
const libraryContainer = document.querySelector(".library");
const popup = document.querySelector(".popup");
const cpopup = document.querySelector(".cancel-popup");


submitButton.addEventListener("click",getFormDetails);
addButton.addEventListener("click",openpopup);
cpopup.addEventListener("click",closepopup);


function Books(title,pages,author,rating,read) {
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.rating = rating;
    this.read= read;
    this.id= function() {
        return library.indexOf(this);
    }
    this.setTitle = function(newTitle){
        this.title = newTitle;
    }
    this.setAuthor = function(newAuthor){
        this.author = newAuthor;
    }
    this.setRating = function(newRating){
        this.rating = newRating;
    }
    this.setStatus = function(){
        this.read = !this.read;
    }
    this.setPages= function(newPages){
        this.pages = newPages;
    }
}

function getFormDetails(evt){
    evt.preventDefault();
    let readStatus= false;
    const bookName =document.querySelector(".bookName");
    const authorName = document.querySelector(".author");
    const pages = document.querySelector(".pages");
    const rating = document.querySelector(".rating");
    const readOrNot = document.querySelector("#read-or-not");
    //form - validation
    if (!bookName.value || !authorName.value || !pages.value || !rating.value) {
        alert('Please fill out all required fields.');
        return; 
    }
    //creating book object
    createBookObject(bookName.value,authorName.value,pages.value,rating.value,readOrNot.checked);

    //close popup window
    closepopup();
}

function createBookObject(bookName,authorName,pages,rating,read){
    const book1 = new Books(bookName,pages,authorName,rating,read);
    console.log(book1);

    //adding book to library
    addBookToLibrary(book1);

    //creating book card
    createBookCard(book1);

}   

function openpopup(){
    popup.classList.add("show");
}

function closepopup(){
    popup.classList.remove('show');
}


function addBookToLibrary(bookObject) {
    library.push(bookObject); // book added to library
}



function createBookCard(book){

    const card = document.createElement("div");
    const card_header = document.createElement("div");
    const card_body = document.createElement("div");
    const card_footer = document.createElement("div");
    card.className="book-card";
    card_header.className="card_header";
    card_body.className="card_body";
    card_footer.className="card_footer";
    card.appendChild(card_header);
    card.appendChild(card_body);
    card.appendChild(card_footer);


    //card-header 
    const title = document.createElement("h3");
    const pages = document.createElement("h6");
    title.innerHTML=`${book.title} <br> by ${book.author}`;
    pages.textContent=`Pages:${book.pages}`
    card_header.appendChild(title);
    card_header.appendChild(pages);


    //card-body
    const status = document.createElement("button");
    const delete_card = document.createElement("button");
    status.textContent="status";
    delete_card.textContent="delete book"
    //set attribute for status and delete card
    status.classList.add("statusButton");
    delete_card.classList.add("deleteCardButton");
    status.setAttribute("data-id",book.id());
    delete_card.setAttribute("data-id",`${book.id()}`);
    status.addEventListener("click",editBook);
    delete_card.addEventListener("click",deleteBook);
    card_body.appendChild(status);
    card_body.appendChild(delete_card);

    //card-footer
    const current_progress = document.createElement("p");
    if (!book.read){
        current_progress.textContent="In-progress";
    }
    else{
        current_progress.textContent="Completed";
    }
    card_footer.appendChild(current_progress);

    
    libraryContainer.appendChild(card);
    
}

function editBook(evt){
    const bookToBeEdited = library[evt.target.getAttribute("data-id")];
    bookToBeEdited.setStatus();
    library[evt.target.getAttribute("data-id")]=bookToBeEdited;
    const parentElement = evt.target.parentNode;
    const grandparent = parentElement.parentNode;
    let footer = grandparent.querySelector(".card_footer p");
    footer.textContent = (footer.textContent==="In-progress")?"completed":"In-progress";
}

function deleteBook(evt){
    const IndexOfbookToBeDeleted = evt.target.getAttribute("data-id");
    delete library[IndexOfbookToBeDeleted];
    const parentElement = evt.target.parentNode;
    const grandparent = parentElement.parentNode;
    libraryContainer.removeChild(grandparent);
}



