Union Gov
=======

# Union Gov project
A website to let people choose/vote for their preferred union government.
[![Form page](https://github.com/primairepopulaire/unionGov/blob/master/docs/images/uniongov-tandabany.png)](https://uniongov.tandabany.fr/)

More details about the context (in French): see [section "Contexte"](#contexte) below.

## Installation guide       
  Check out the installation guide [here](https://github.com/primairepopulaire/unionGov/blob/master/docs/install.md)  

## Developer guide       
  Check out the developer guide [here](https://github.com/primairepopulaire/unionGov/blob/master/docs/dev.md)  

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
Et son choix serait gardé (idéalement un lien web), afin de pouvoir dans un deuxième temps peut-être présenter des sortes de statistiques du gouvernement le plus proposé.

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
