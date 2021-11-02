# Installation guide
From now on the **absolute path** to the working directory (root of your repo) will be mentioned as `repoRoot`
### Table of Contents  
[Docker installation](#docker)  
[Classic installation](#classic)  

## <a name="docker"></a>Docker installation
### Prerequisites
* git
* [docker](https://docs.docker.com/engine/install/)
* [docker-compose](https://docs.docker.com/compose/install/)

### Download Sources
* Clone the project git repository in a specific directory <XXX>
  ```
  cd <XXX>
  git clone <https_path_to_repo>/unionGov.git .
  ```

### Setup Docker containers
* Customize your Docker environment
  * `cd <repoRoot>`
  * create a file `.env` in `<repoRoot>`
  * create a folder that will contain the database persistent data
    ```
    cd <repoRoot>
    mkdir -p data/db
    ```
  * copy and set up the environment parameters in your `.env` file:
    ```
    SECRET_KEY=my_secret_key_for_django
    DB_HOST=db #do not change
    DB_NAME=uniongov
    DB_USER=user
    DB_PASSWORD=password
    DB_DIR=./data/db #do not change
    DB_PORT=5432 #do not change
    ```
* Build Docker images defined in `docker-compose.<$env>.yml`
  * **dev mode**: `docker-compose -f docker-compose.dev.yml build`
  * **prod mode**: `DEBUG=False API_HOST=uniongov.tandabany.fr docker-compose -f docker-compose.prod.yml build --no-cache`
  
* Create & start the Docker containers
  * **dev mode**: `docker-compose -f docker-compose.dev.yml up -d`
  * **prod mode**: `DEBUG=False API_HOST=uniongov.tandabany.fr docker-compose -f docker-compose.prod.yml up -d`
  
* Access :
  * front-end at `localhost:9000`
  * back-end at `localhost:9000/api/`

### Troubleshooting install
#### Complete purge & create from scratch
* Purge containers, networks and volumes
  ```
  cd <repoRoot>
  docker-compose -f docker-compose.dev.yml down #remove service containers, service volumes and common network 
  sudo rm -rf data/db/*  #remove postgresql persistent data
  docker-compose -f docker-compose.dev.yml up -d
  ```
* Recreate the containers and let them run in background mode
  `docker-compose -f docker-compose.dev.yml up -d`
  
  

## <a name="classic"></a>Classic installation
### Prerequisites
  * git
  * pipenv
  * postgres
  * nodejs
  * yarn

### Download Sources
  * Get the project git repository in `repoRoot`
   `git clone https://github.com/primairepopulaire/unionGov.git <repoRoot>`

### Initial setup
As long as the backend & frontend tools are not built as linux system services, you will need two terminals dedicated to run them in background.
#### Backend setup
##### Install
* Install dependencies from `Pipfile`: 
  `pipenv sync` 
  (NB: `pipenv install` does not assure you that versions are *exactly* those used for dev!)
* activate the local environnement: 
  `pipenv shell`
* Set up environment variables in `unionGov` directory:
  * Create `.env` file
    ```
    cd <repoRoot>
    cd unionGov
    touch .env
    ```
  * Copy and set up the environment parameters in your `.env` file:
    ```
    SECRET_KEY=my_secret_key_no_inverted_commas
    DB_NAME=name_of_postgres_db_to_use
    DB_USER=name_of_postgres_user
    DB_PASSWORD=password_for_postgres_db
    DB_HOST=eg_localhost
    DB_PORT=eg_5432_for_postgres
    ```
* Generate the database
  `python manage.py migrate`
* Populate the database (recovers the data from the `<repoRoot>/unionGov/gov/fixtures/default.yaml` file)
  `python manage.py loaddata --app gov default` 
* create a superuser to access the admin (keep memory of the credentials to access the admin view):
  `python manage.py createsuperuser`

NB: a superuser is needed, the DB user defined to access the database is not enough!
##### Execute
* From `repoRoot`, if needed, activate virtual env:
  `pipenv shell`
* Run the server from `unionGov`:
  `python manage.py runserver`

The backend is available in three parts:
* the admin view (management of entities in the database) at `http://localhost:8000/admin`
* the "main" view at `http://localhost:8000/gov`
* API view at `http://localhost:8000/api` (more details in the view itself)

#### Frontend setup
##### Install
From the `frontend` folder, install necessary packages with  `yarn`:
* install the required packages with 
  ```
  cd <repoRoot>/frontend
  yarnpkg install
  ```
For more details, see `README.md` in the folder `frontend`.
##### Execute
From the `frontend` folder, start `yarn` server:
```
cd <repoRoot>/frontend
yarnpkg start
```
The frontend is available from `http://localhost:3000`

In the case when the frontend starts from another URL than `http://localhost:3000`, a fix can be to replace the line:
`"start": "react-scripts start"` by `"start": "HOST=localhost react-scripts start"`
in the `scripts` section of the `frontend/package.json` file.  
