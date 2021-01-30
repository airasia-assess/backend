# backend
airasia super assessment backend repo
master branch is the latest stable version branch.

This is node.js app and you can run it via 'npm start' command.
it will run locally on port 1026 as you can see in terminal.
it should open to using internet to connect mongodb on aws.
I used router, controller and service architecture.
you can pull this server image from docker hub: docker pull 19860906/auth-service:latest
heroku deployed url: https://airasia-auth-service-backend.herokuapp.com/

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
    
- '/api/auth/login': get method
  1. request body: you can send username or email or both
    {
        "username": "username",
        "email": "username@email.com",
        "pass": "pass"
    }
  2. response body:
    {
        "success": false or true,
        "errMsg": "error message if exists",
        id: user id,
        username: user username,
        email: user email
    }
    
deploy backend on minikube:
  - after starting minikube, To see the kubectl configuration use the command: kubectl config view
  - create a deployment: kubectl create -f kubectl-deploy.yaml
  - we’re going live through Kubernetes service object: kubectl expose deployment nodejs-deployment --type="LoadBalancer"
  - getting an external IP:
    1. kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/namespace.yaml
    2. kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/metallb.yaml # On the first install only
    3. kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
  - run command: kubectl create -f configmap.yaml
  - we have to delete the svc and create the service again:
    1. Kubectl delete svc nodejs-deployment
    2. kubectl expose deployment  nodejs-deployment --type="LoadBalancer"
  
  
  
  
  
  
  
