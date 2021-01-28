# backend
airasia super assessment backend repo

This is node.js app and you can run it via 'npm start' command.
it will run locally on port 1026 as you can see in terminal.
it should open to using internet to connect mongodb on aws.
I used router, controller and service architecture.
you can pull this server image from docker hub: docker pull 19860906/auth-service:latest

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
- '/api/auth/signup': post method
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
        "errMsg": "error message if exists",
        "token": "eyJhbGciOiJIUzI1NiJ9.NjAwYWVjNGMzMGM5Y2YxNDA2YmMwN2Ex.I3y1MhBR3lXfoGby..."
    }
