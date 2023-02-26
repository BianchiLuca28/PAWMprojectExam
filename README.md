# PAWMprojectExam

Project for the exam of the subject Progettazione di Applicazioni Web e Mobili

---

# Application

This application is basically used as a simple Note Keeper.
Inside we can do basic operations, such as ADD, MODIFY, DELETE notes.

## Authentication

In this application is also mandatory to do the Login and Registration to work with the notes.
More precisely the authentication is managed using JWT (JSON Web Token).
For the Registration are required Email, Password and Username.

Regarding the frontend instead, once the JWT is received (if the user is logged in correctly), there is an Interceptor to intercept all requests that goes to the backend, because before forwarding them to the backend it adds in the Header the JWT.

## Logs

There is also the possibility to keep track of the actions performed on the notes by viewing a simple log manager that lets you see your operations performed.

---

# Technology

About the technology used in this application, first of all it's structuerd with a Frontend in Angular and a Backend in Nestjs.
Note also that in the frontend is used Angular Material for a better layout.
In the backend instead there are some dependecies used, such as: mongoose, bcrypt, class-validator and class-transformer, passport and passport-jwt, sanitize-html and @nestjs/serve-static

To store all the information is used a MongoDB Database (locally).

## Vulnerabilities

In this application are also managed some usual vulnerabilities.

### XSS

To protect all the forms that are passed in the API from XSS (Cross-Site Scripting), the text passed is always sanitized from all HTML Tags.

### NoSQL Injection

Even though using MongoDB there won't be any problem regarding SQL Injection, even with NoSQL Databases there might be some inputs that shouldn't be allowed.

### CORS

This is not exactly a vulnerability, but to prevent that during developing the browser generates CORS (Cross-Origin Resource Sharing), since during developing there will be 2 different origins, instead of enabling CORS (that can be quite problematic if we forget to disable it), in the frontend is used a Proxy to redirect all requests (during developing) from `http://localhost:4200/api` to `http://localhost:3000/api`.

# API

The routes used by the frontend to interact with the backend are:

- POST .../api/auth/login : for the Login
- POST .../api/auth/register : for the Registration
- GET .../api/notes : to get ALL notes
- GET .../api/notes/:id : to get the note with that ID
- POST .../api/notes : to create a new note
- DELETE .../api/notes/:id : to delete the note with that ID
- PUT .../api/notes/:id : to update the note with that ID
- GET .../api/logs : to get ALL logs
- GET .../api/logs/:id : to get the log with that ID

The dotes (.../) are the domain in which the backend is executed.
(Note that obviously some of them are protected by the JWT).
