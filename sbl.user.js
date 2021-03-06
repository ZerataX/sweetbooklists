// ==UserScript==
// @name          sweetbooklists
// @version       1.0
// @description   Exports a list of books by the given search parameters from tsumino
// @author        ZerataX
// @namespace     mail@zera.tax
// @license       MIT
// @updateURL     https://openuserjs.org/meta/ZerataX/sweetbooklists.meta.js
// @include       http://www.tsumino.com/*
// @include       http://tsumino.com/*
// @exclude       http://tsumino.com/Forum/*
// @exclude       http://tsumino.com/Account/*
// @exclude       http://tsumino.com/About/*
// @exclude       http://tsumino.com/Contribute/*
// @require       https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2014-11-29/FileSaver.min.js
// @grant         none
// ==/UserScript==

var books;
var book_info = "";
var book_title;
var finished = 0;

$(document).ready(function(){
    $('.col-md-12').append('<div class="col-md-12"><button id="export-books">Export Books</button>');
});

function getBookInfo() {
    books = $('.book-grid-item-container');
    console.log("Books: " + books.length);
    for (var i =  books.length - 1; i >= 0; i--) {
        book_title = $(books[i]).find('.title-text')[0].innerHTML;
        console.log(book_title);
        book_info += book_title + "\n";
    }
    $('.next').trigger('click');
}

function loopLi() {
    setInterval(function() { // this code is executed every 500 milliseconds:

        if($('.next.disabled').length === 0 && finished === 0) {
            getBookInfo();
            console.log("Next page");
        }else if (finished === 0){
            getBookInfo();
            finished = 1;
            console.log("Finished");
            if (confirm("Save list to file?") === true) {
                var blob = new Blob([book_info], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "book_list.txt");
            } else {
                alert("Nothing saved :/");
            }

        }
    }, 3500);
}

$('#export-books').click(function() {
    book_info = "";
    finished = 0;
    $(loopLi);
});
