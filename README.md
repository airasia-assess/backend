# backend
airasia super assessment backend repo

This is node.js app and you can run it via 'npm start' command.
it will run locally on port 1026 as you can see in terminal.
it should open to using internet to connect mongodb on aws.

db design
- tables
  1. users
    name:"name"
    username:"username"
    email:"username@email.com"
    pass:"$2b$10$3MPxuH5/ue93xWU6YHkxXe5M2AJVsRwx.qUQhRQIu2XFkynmSKkWe"
    dateCreated:2021-01-22T15:16:28.719+00:00
    active:true
    token:"eyJhbGciOiJIUzI1NiJ9.NjAwYWVjNGMzMGM5Y2YxNDA2YmMwN2Ex.I3y1MhBR3lXfoGby..."

apis instructions:
- '/api/signup': post method
  1. request body
    {
        "name": "name",
        "username": "username",
        "email": "username@email.com",
        "pass": "pass"
    }
  2. response body:
    {
        "success": false or true,
        "errMessage": "error message",
        "token": "eyJhbGciOiJIUzI1NiJ9.NjAwYWVjNGMzMGM5Y2YxNDA2YmMwN2Ex.I3y1MhBR3lXfoGby..."
    }