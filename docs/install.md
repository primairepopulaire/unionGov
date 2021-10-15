# Installation guide
From now on the **absolute path** to the working directory (any directory you want) will be mentioned as `workingDir`
### Table of Contents  
[Docker installation](#docker)  
[Classic installation](#classic)  

## <a name="docker"></a>Docker installation
### Prerequisites
* git
* [docker](https://docs.docker.com/engine/install/)
* [docker-compose](https://docs.docker.com/compose/install/)

### Download Sources
* Clone the project git repository in a specific directory
  ```
  cd <workingDir>
  git clone https://github.com/primairepopulaire/unionGov.git .
  ```
* Customize your Docker environment
  * `cd <workingDir>`
  * create a file `.env` in `<workingDir>`
  * copy and set up the environment parameters in your `.env` file:
    ```
    SECRET_KEY=my_secret_key_for_django
    DB_NAME=name_of_the_postgres_db_to_use
    DB_USER=name_of_postgres_user
    DB_PASSWORD=password_for_postgres_db
    DB_DIR=local/directory/where/database/will/be/stored # For persistence of data
    ```
* Build Docker images defined in `docker-compose.<$env>.yml`
  * **dev mode**: `docker-compose -f docker-compose.dev.yml build`
  * ** prod mode**: `DEBUG=False API_HOST=uniongov.tandabany.fr docker-compose -f docker-compose.prod.yml build --no-cache`
  
* Create & start the Docker containers
  * **dev mode**: `docker-compose -f docker-compose.dev.yml restart`
  * ** prod mode**: `DEBUG=False API_HOST=uniongov.tandabany.fr docker-compose -f docker-compose.prod.yml restart`
  
* Access :
  * front-end at `localhost:9000`
  * back-end at `localhost:9000/api/`

## <a name="classic"></a>Classic installation
### Prerequisites
  * git
  * pipenv
  * postgres
  * nodejs
  * yarn

### Download Sources
  * Get the project git repository in `workingDir`
   `git clone https://github.com/primairepopulaire/unionGov.git <workingDir>`

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
    cd <workingDir>
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
* Populate the database (recovers the data from the `<workingDir>/unionGov/gov/fixtures/default.yaml` file)
  `python manage.py loaddata --app gov default` 
* create a superuser to access the admin (keep memory of the credentials to access the admin view):
  `python manage.py createsuperuser`

NB: a superuser is needed, the DB user defined to access the database is not enough!
##### Execute
* From `workingDir`, if needed, activate virtual env:
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
  cd <workingDir>/frontend
  yarnpkg install
  ```
For more details, see `README.md` in the folder `frontend`.
##### Execute
From the `frontend` folder, start `yarn` server:
```
cd <workingDir>/frontend
yarnpkg start
```
The frontend is available from `http://localhost:3000`

In the case when the frontend starts from another URL than `http://localhost:3000`, a fix can be to replace the line:
`"start": "react-scripts start"` by `"start": "HOST=localhost react-scripts start"`
in the `scripts` section of the `frontend/package.json` file.  