# Union Gov
A website to let people choose/vote for their preferred union government.

More details about the context (in French): see [section "Contexte"](#contexte) below.

## Configuration and installation

In order to run this repository,

* clone the repository (*e.g.* `git clone https://github.com/primairepopulaire/unionGov.git`, but you might want to use ssh),
* make sure `pipenv` is installed in your Python3 (if not: `sudo apt install pipenv` should work on Linux else try `python -m pip install pipenv`),
* in the current configuration, you will need a Postgres database - `psycopg2-binary` package will be installed using `pipenv`.

### Backend installation

Move to the installation folder and:
* install dependancies from Pipfile: `pipenv sync` (NB: `pipenv install` does not assure you that versions are *exactly* those used for dev!),
* activate the local environnement with `pipenv shell`.

Now move to the folder `unionGov` with `cd unionGov` and:
* add a file `.env` containing credentials under the form: 
```
SECRET_KEY=my_secret_key_no_inverted_commas
DB_NAME=name_of_postgres_db_to_use
DB_USER=name_of_postgres_user
DB_PASSWORD=password_for_postgres_db
```
* generate the database with `python manage.py migrate`,
* populate the database with `python manage.py loaddata --app gov default` (which recovers the data from the `gov/fixtures/default.yaml` file),
* create a superuser (to access the admin) with `python manage.py createsuperuser` and keep the username and password for accessing the admin view,
* see the [section below](#running-the-backend) to see how to run the backend. 

NB: a superuser is needed, the DB user defined to access the database is not enough!

### Frontend installation

Here we assume that Node.js and `yarn` are already available on the computer. For more details see e.g. [this tutorial](https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment) and the [yarn installation instructions](https://classic.yarnpkg.com/en/docs/install#debian-stable).

From the `frontend` folder, 
* install the required packages with 
```
yarnpkg install
```

For more details, see `README.md` in the folder `frontend`.

### Additional notes

* In the current version, we use sqlite3 as database. In a possible production version, we would use a more permanent database.

## Running the code

To run the full website, you need both backend and frontend to run simultaneously. The most convenient setting may be to have two terminals, one for each part of the website.

### Running the backend

From root folder, if need be: activate virtual env with:
```
pipenv shell
```

Then move to `unionGov` folder and type:
```
python manage.py runserver
```
The backend is available in three parts:

* the admin view (management of entities in the database) at `http://localhost:8000/admin`,
* access to the "main" view at `http://localhost:8000/gov`,
* API view at `http://localhost:8000/api` (more details in the view itself).

### Running the frontend

From the `frontend` folder, type:
```
yarnpkg start
```

The frontend is available from `http://localhost:3000`.

### Additional notes

* In the case when the frontend starts from another URL than `http://localhost:3000`, a fix can be to replace the line:
```
    "start": "react-scripts start",
```
by 
```
    "start": "HOST=localhost react-scripts start",
```
in the `scripts` section of the `frontend/package.json` file.

# Contexte

This section gives more background details about the project and is written in French ;-).

Il s'agit d'un projet parallèle à la [primaire populaire](https://primairepopulaire.fr/).

## Point de départ :

(message sur Discord en relation avec la Primaire Pop)'

> Un mini site web pour dire les former un gouvernement d’union

* Un jeu pour choisir ton/ta présidente et son gouvernement (choix multiples et possibilité d‘ajouter des gens ou choix parmi les parrainé.ées)

Et tu peux créer tes ministères :
* Ministère de l’écologie et des finances
* Ministère de l’improbable
* Ministère des futurs
* …

Plus de détails :

> Un site web pour former un gouvernement d’union

- Les candidatures seraient celles parrainées sur la primaire populaire
- Les "places" à prendre:
  - Président.te
  - Premier.ère ministre
  - 8 postes de ministres

Ainsi la personne choisirait d'un côté les candidatures (en reprenant le nom et le visuel des visages primaire).
Et placerait ces candidatures dans des cases correspondantes aux différentes places.

- L'ajout des candidatures pourraient se faire manuellement au fur et à mesure

Une fois le gouvernement choisi, la personne aurait la possibilité de partager son choix de gouvernement sur les réseaux sociaux.
Et sont choix serait gardé (idéalement un lien web), afin de pouvoir dans un deuxième temps peut-être présenter des sortes de statistiques du gouvernement le plus proposé.

## Conception et fonctionnalités

### Une visite typique

1. Page d'accueil du site, lien avec la Primaire Pop, le principe de la sélection d'un gouvernement d'union... Deux boutons :
    - Voir les candidats (voir Candidats, ci-dessous)
    - Faire mon gouvernement ! (voir Gouvernement, ci-dessous)
2. Candidats : 
    - Présentation des candidats (uniquement liste des noms et dessin des visages, crédits: illustratrice : Marie Casaÿs)
    - Lien vers le site de la primaire populaire pour plus de détails
3. Gouvernement
    - Liste des postes à pourvoir (voir listes dans "Références")
    - Éventuellement : possibilité de créer un nouveau ministère
    - En bas, deux boutons :
        - Sauvegarder (qui enregistre la config dans la DB)
        - Partager (pour partager sur les réseaux sociaux...)

Sur le point 3, ce sera peut-être plus ergonomique de n'avoir qu'un seul bouton (qui fait à la fois la sauvegarde et enclenche la séquence pour partager...). À la fin de la séquence de partage, doit-il être encore possible de modifier le gouvernement ? Peut-être pas... Au quel cas, si on fait des modifs à une config existante, ça crée automatiquement une nouvelle config !

Une proposition pour l'ergonomie :

> On pourrait imaginer avoir l'ensemble des candidatures sur la page de création du gouvernement.

Et que juste en cliquant à un endroit sur le nom ou le dessin de la personne, on puisse choisir directement un rôle. Ainsi à chaque fois qu'un rôle est attribué, le clic sur la personne suivante enlèverai le rôle précédemment attribué et ainsi de suite.
Une fois tous les rôles attribués, le gouvernement est généré.

### Constitution de la DB

Tables :

- Utilisateurs (`users`)
    - Adresse mail
    - Prénom (optionnel)
    - Nom (optionnel)
- ConfigRefs (nom à spécifier !)

    Essentiellement une référence pour sauvegarder les configs sauvegardées/partagées

    Colonnes :

    - `config_ref` (chaîne de caractères aléatoires)
    - `save_date`
    - `user` (si disponible)
- Candidats (`candidates`)

    Comporte les colonnes :

    - candidateId
    - Prénom
    - Nom
    - Lien vers image Prim Pop
- Postes (`positions`)
    - positionId
    - Nom
- Configs

    Enregistre une config spécifique, en relation avec une ligne de `configRefs`

    Colonnes :

    - `config_ref`
    - `position`
    - `candidate`

    La sauvegarde d'une nouvelle ligne dans Configs comporte une vérification, à savoir que le nouveau candidat et le nouveau poste ne sont pas déjà présents parmi les lignes de config associées à la référence `config_ref` courante.

### Fonctionnalités

#### La base :

- constituer le gouvernement (à partir des postes et des candidats existants)
- partager son gouvernement !

#### Extension 1 :

- pouvoir ajouter des "candidats"
- pouvoir ajouter des ministères

#### Extension 2 :

- une fois pouvoir retrouver les configurations proposées précédemment...

### Questions

- À quel point est-il possible de partager sans que l'utilisateur soit enregistré ? Par exemple : partager l'URL en incluant la configId renverrait directement sur le gouvernement enregistré...
- Méthode de déploiement de l'application ?
- Possibilité d'utiliser un bouton "nouveau gouvernement" pour créer une nouvelle config_ref ? Sinon, possible de créer une nouvelle config_ref dès qu'un nouvel utilisateur arrive sur le site ?
- Système à utiliser pour partager le gouvernement sur les réseaux sociaux : existe-t-il du code facilement disponible à ce niveau là ? Est-il nécessaire que l'utilisateur soit enregistré pour le faire ?

## Références

- Infos rassemblées actuellement (dont listes des candidats, des ministères disponibles, ...) : voir [ce document](https://docs.google.com/spreadsheets/d/1M__XSj-t5aVmp-XiJZNYz7GMJfZxu_GumKynP3_k_iI/edit?usp=sharing).
- Tutoriel de référence Django + React : voir [ici](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react).
