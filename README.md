# LangMaster

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

_LangMaster_ is a full-stack language learning application that provides an intuitive way to learn languages.

## Technologies Used

**Front-End** - React (TypeScript), pnpm

**Back-End** - Spring Boot (Java)

**DBMS** - PostgreSQL

## Instructions for setup

**Front End**

Ensure that you hav _pnpm_ installed. The front end dependencies must be installed. After this, the client-side can be run.

> _pnpm i_

> _pnpm dev_

**Database**

In order to make the back end function, the database must function properly. In order to
do this, the following have to be put in a .env file:

> DB_HOST: This could be "localhost", for instance

> DB_PORT: The port number your database runs on

> DB_NAME: The name of the database you have created

> DB_USERNAME: The username of a user with privileges towards the database

> DB_PASSWORD: The user password

> JWT_SECRET: A 256-letter secret key for the authentication. You can generate this in any website.

Now make sure your _Postgresql_ instance is running.

**Back End**

The back end is a more complex case than front-end. You need to have both _Gradle_ and _Java_ installed.
_Java 21_ and _Gradle 8.12_ should be enough when it comes to ensuring correct versions have been
installed.

After all the mentioned steps have been completed, enter the following command:

> *gradle bootRun*

Now the LangMaster full-stack application should be running.

## Dependencies

This application only uses dependencies that have licenses compatible with **GNU General Public License v3**.
The goal is to ensure that the application is, and will remain as, **free software** for everyone to use.

[Read more about this on gnu.org](https://www.gnu.org/licenses/license-compatibility.html)
