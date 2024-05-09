# Eilla-test

## BEFORE START

All applications were developed on Ubuntu 20.04.6 LTS.

## INSTALL

Basically, the application consists of two parts:

### BACKEND

The application needs a restfull api and database to store the dataset.
Considering this configuration, [FastApi](https://fastapi.tiangolo.com/) was used for that purpose, alongside with [Alembic](https://alembic.sqlalchemy.org/en/latest/index.html)
to control migrations and [SqlAlchemy](https://www.sqlalchemy.org/) to create
and manage the database.
It is not necessary to use the backend as an user, just the frontend (as expected).

### FRONTEND

The most popular libray web application, [React](https://react.dev/) was used in the application to implement the frontend. Based on a single page view, the user can access it via browser http://localhost:3000/ (after installing and running the application).

## INSTALATION

To install and run this application, there are 3 possibilites. After finishing the installation, you can access the application through these links:

### Frontend

http://localhost:3000/

### Backend

http://localhost:8000/docs

First, we need to install the application using one of the 3 possibilites below:

### 1 - DOCKER COMPOSE

It is necessary to follow these steps bellow:

#### 1 - Install docker and docker compose (https://docs.docker.com/compose/)

#### 2 - Run the docker compose commands bellow in terminal, on the root directory (eilla-test):

```bash
    docker-compose build
    docker-compose up web
```

For building and running the application automatically, including migrations and seed data to db. You can stop containers and remove containers, networks, volumes, and images created by docker-compose up.

```bash
    ctrl + c
    docker-compose down
```

OR

```bash
    ctrl + c
    docker rmi -f $(docker images -aq
```

### 2 - DOCKER

You can build separetaly both applications. On each application root folder (eilla-test/backend/company_finder and eilla-test/backend/company_finder) execute these commands:

#### 1 - Install docker (https://docs.docker.com/engine/install/)

#### 2 - Building and running

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

### 3 - Install without dockerizing

#### Backend

#### 1 - Create a virtual enviroment (optional)

For creating the [virtual enviroment](https://docs.python.org/3/library/venv.html):

##### 1.a - Install virtual enviroment in PC

##### 1.b - Enter the backend folder, create and activate env.

```bash
cd /path/to/eilla-test/backend
python3 -m venv my_virtual_env
source backend_env/bin/activate
```

#### 2 - Install and run

Type these commands on terminal:

```bash
   cd /path/to/eilla-test/backend/company_finder
   pip3 install -r requirements.txt
   fastapi dev main.py
```

In order to test whether it is working, try to access http://localhost:8000/docs

#### Frontend

##### 1.a - Install NodeJs engine (https://nodejs.org/en)

##### 1.b - Install ReactJs (https://react.dev/learn/installation)

##### 1.c - Enter the frontend folder and install dependencies.

```bash
    cd /path/to/eilla-test/frontend/company_finder
    npm install
```

##### 1.d - Run

```bash
    npm start
```

## USING THE APPLICATION

As an user, access the [frontend](http://localhost:3000/) and a page like this should be visible:

After typing any company name into the search bar, the results should be visible in the same page:

If there is any result, similar companies can be accessed by clicking in "Similar" button on each row:

#### Backend

Backend has two endpoints to expose the data, located at company_finder/main.py. To feed the sqlite database,
[Pandas](https://pandas.pydata.org/) was used to read the csv file, inside of one migration files (in Alembic is called revision).
In order to find "similar" companies, the criteria is located at main.pu file, which is using the industry, country and keywords fields.
