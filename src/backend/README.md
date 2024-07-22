# LangMaster Back-End

_LangMaster_ back-end was created with **Spring Boot** and programmed with **Java**.
Here is some information that explains how the back-end functions-

#### PostgreSQL

The back-end uses PostgreSQL as its database management system. This has helped with the
abstraction of the many entities present and their relations. A connection is established
with variables in a _.env_ file. _data.sql_ file is used to initialize the application
with data that should be there from the get-go.

#### Authentication

The server provides _JWT Tokens_ to give privileges to successfully authenticated users.
These tokens expire in a period of time.

#### Security Measures

User passwords are not stored as plain text. They are instead hashed before the
credentials are stored in the database.
