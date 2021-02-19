# backend
airasia super assessment backend repo
master branch is the latest stable version branch.

This is node.js app and you can run it via 'npm start' command.
it will run locally on port 1026 as you can see in terminal.
it should open to using internet to connect mongodb on aws.
I used router, controller and service architecture.

you can pull this server image from docker hub: docker pull 19860906/auth-service:latest
I exposed it on port 1026 and http.

heroku deployed url: https://airasia-auth-service-backend.herokuapp.com/

db design
- tables
  1. users
    {
      name: {
        type: String,
        required: true,
        maxlength: 150,
      },
      username: {
        type: String,
        required: true,
        maxlength: 15,
        unique: true,
      },
      pass: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 6,
      },
      email: {
        type: String,
        required: true,
        maxlength: 60,
        unique: true,
      },
      dateCreated: {
        type: Date,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
      token: String,
      data: String
    }
    
  2. permissions
    {
      code: {
        type: String,
        required: true,
        maxlength: 6,
        minlength: 2,
        unique: true,
      },
      name: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 6
      },
      dateCreated: {
        type: Date,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
      data: String
    }
    
  3. roles
    {
      code: {
        type: String,
        required: true,
        maxlength: 6,
        minlength: 2,
        unique: true,
      },
      name: {
        type: String,
        required: true,
        maxlength: 60,
        minlength: 6
      },
      permissions: {
        type: [String],
        required: true
      },
      dateCreated: {
        type: Date,
        required: true,
        default: new Date()
      },
      active: {
        type: Boolean,
        required: true,
        default: true
      },
      data: String,
    }

apis instructions:
- '/api/auth/signup': post method
  1. request body
    {
        "name": "name",
        "username": "username",
        "email": "username@email.com",
        "pass": "pass"
    }
  2. response body
    {
        "success": false or true,
        "errMsg": "error message if exists",
        "token": "token if signup op is successful"
    }
    
- '/api/auth/login': post method
  1. request body: you can send username or email or both
    {
        "username": "username",
        "email": "username@email.com",
        "pass": "pass"
    }
  2. response body
    {
        "success": false or true,
        "errMsg": "error message if exists",
        id: user id,
        username: user username,
        email: user email
    }
    
- '/api/permission/permissions': post method
  1. request body
    {
        "code": "permission code",
        "name": "permission name"
    }
  2. response body
    {
        "success": false or true,
        "errMsg": "error message if exists",
        "permission": "permission description if create op is successful"
    }
    
- '/api/permission/permissions': get method
  1. request body: it doesn't contain request body
  2. response body
    {
        "success": false or true,
        "errMsg": "error message if exists",
        "permissions": [
          {
            list of permissions
          }
        ]
    }
    
 - '/api/role/roles': post method
  1. request body
    {
      "code": "role code",
      "name": "role name",
      "permissions": [
          "permission code",
          "permission code"
      ]
    }
  2. response body
    {
      "success": false or true,
      "errMsg": "error message if exists",
      "role": "role description if create op is successful"
    }
    
deploy backend on minikube:
  - after starting minikube, To see the kubectl configuration use the command: kubectl config view
  - create a deployment: kubectl create -f auth-service --image=19860906/auth-service:latest
  - we’re going live through Kubernetes service object: kubectl expose deployment auth-service --type="LoadBalancer"
  - getting an external IP:
    1. kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/namespace.yaml
    2. kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.9.3/manifests/metallb.yaml # On the first install only
    3. kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
  - run command: kubectl create -f configmap.yaml
  - we have to delete the svc and create the service again:
    1. Kubectl delete service auth-service
    2. kubectl expose deployment auth-service --type="LoadBalancer"
  - you can get the minikube api url via: minikube ip
    The API server runs on 8443 by default.
  
  
  
  
  
  
  
