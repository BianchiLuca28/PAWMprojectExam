# PAWMprojectExam
Project for the exam of the subject Progettazione di Applicazioni Web e Mobili

---

# Application
This application is basically used as a simple Note Keeper. 
Inside we can do basic operations, such as ADD, MODIFY, DELETE notes.

## Logs
There is also the possibility to keep track of the actions performed on the notes by viewing a simple log manager that lets you see your operations.

---

# Technology
About the technology used in this application, first of all it's structuerd with a Frontend in Angular and a Backend in Nestjs.
Note also that in the frontend is used Angular Material for a better layout.

## Authentication
In this application is also mandatory to do the Login and Registration to work with the notes.
More precisely the authentication is managed using JWT (JSON Web Token).

## Storage
To store all the information is used a MongoDB Database (locally).

## API
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
