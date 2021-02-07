# Black Sales
An e-commerce site made with React, to practice and showcase use of the REST API and JWT login. It also serves the purpose of showcasing familiarity with Bootstrap, CSS and code organization.

## Launch
A postgres database must be set according to the data in `db.js` and the commands in `database.sql`, inside the server folder.

To install dependencies, one must use the `npm i` command inside both the client and the server folders. Once everything is ready, `npm start` can be used inside the client folder.

## Functionalities
A guest is able to create an account, becoming a user. They may also browse products without making an account. Once a user, they're able to alter some of their info, announce products and order them.

Since this project was not meant to be used commercially, validation is shallow - users don't need to confirm ownership of their e-mails. They're also free to order whichever product they want without having to pay - and as such, there's no stock either.

## Notes
The project is completed, the results I achieved satisfied my every goal for the site, however it may be revisited later, if I ever feel the need to learn how to implement real transactions, as the developed UI and database can be reused for these purposes.