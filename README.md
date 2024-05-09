# Eilla-test

## BEFORE START

All of this applications was developed in Ubuntu 20.04.6 LTS.

## INSTALL

This application basically consists in two parts:

### BACKEND

The application needs a restfull api and database to store the dataset.
Because of that, [FastApi](https://fastapi.tiangolo.com/) was used for that
purpose, togheter with [Alembic](https://alembic.sqlalchemy.org/en/latest/index.html)
for controlling migrations and [SqlAlchemy](https://www.sqlalchemy.org/) for creating
and managing the database.
It is not necessary to use the backend as a user, just the frontend (as expected).

### FRONTEND

The most used libray web application, [React](https://react.dev/) was used here to implement the frontend part. Based on single page view, the user can access on the browser via http://localhost:3000/ (after install and running the application, of course).

## INSTALATION

In order to run this aplication, there are one of 3 ways to do it. After finished any of installation, you can access the application with these links:

### Frontend

http://localhost:3000/

### Backend

http://localhost:8000/docs

First, we need to install the application one of these 3 options:

### 1 - DOCKER COMPOSE

It is necessary to follow these steps bellow:

#### 1 - Install docker and docker compose (https://docs.docker.com/compose/)

#### 2 - Run the docker compose commands bellow in terminal, on the root directory (eilla-test):

```bash
    docker-compose build
    docker-compose up web
```

For building and running the application automatically, including migrations and seed data to db. You can stops containers and removes containers, networks, volumes, and images created by docker-compose up.

```bash
    ctrl + c
    docker-compose down
```

### 2 - DOCKER

You can build separetaly both applications. Enter on each application root folders (eilla-test/backend/company_finder and eilla-test/backend/company_finder) and execute these commands:

#### 1 - Install docker (https://docs.docker.com/engine/install/)

#### 1 - Building and running

##### Frontend

```bash
docker build --no-cache -t company_frontend:latest .
docker run --network=host company_frontend:latest
```

##### Backend

```bash
docker build --no-cache -t company_backend:latest .
docker run --network=host company_backend:latest
```

### 3 - Install without dockerize

#### Backend

#### 1 - Create a virtual enviroment (optional)

For creating the [virtual enviroment](https://docs.python.org/3/library/venv.html), you have to:

##### 1.a - Install virtual enviroment in PC

##### 1.b - Enter the backend directory, create and activate env.

```bash
cd /path/to/eilla-test/backend
python3 -m venv my_virtual_env
source backend_env/bin/activate
```

#### 2 - Install and run

Enter these commands on terminal:

```bash
   cd /path/to/eilla-test/backend/company_finder
   pip3 install -r requirements.txt
   fastapi dev main.py
```

In order to test if its working, try to access http://localhost:8000/docs

#### Frontend

##### 1.a - Install NodeJs engine (https://nodejs.org/en)

##### 1.b - Install ReactJs (https://react.dev/learn/installation)

##### 1.c - Enter the frontend directory, install dependencies.

```bash
    cd /path/to/eilla-test/frontend/company_finder
    npm install
```

##### 1.d - Run

```bash
    npm start
```

## USING THE APPLICATION

As a user, just access the [frontend](http://localhost:3000/) and you should see the page like this:

After putting down some company name in search bar, you should see the results in same page:

And if it has results, you can access similaries companies by clicking in "Similar" button in each row:

### Notes

## Issues and Improvements

### Issues

### Improvements
