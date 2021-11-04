# nodeExpressSqliteEJS_2
A simple demo application on how to combine node + express + sqlite + EJS


## Installation

1) Clone the repository
2) `npm install`
3) `npm start`

## What works
* This application has the capability of:
  * adding book entries
  * deleting book entries
  * displaying up to 20 book entries

## what needs work
* updating the book entries
* adding user information
* adding geographical information
* adding book author information

## What difficulties we faced
* the idea of a book exchange is quite complicated
* creating a database that houses the logic of a book exchange is complicated and only through trial and error do we know if we are on the right track or not as there isn't really another way to check the logic. 
* one of the things that took us too long to realize is that the unique primary key identifier for the book, which we chose to be the isbn, is improperly inputed.
* We had originally inputed it into our original database from last week as a 13 digit isbn with dashes in between (-); 
  * for example: 978-3-16-148410-0
* this caused us huge issues in that we couldn't increment it and we weren't able to add or delete it from the application 
