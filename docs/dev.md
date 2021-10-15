# Developer guide

### Table of Contents  
[Global architecture](#global-archi)  
[Development](#development)  
[Test](#test)  
[Production](#production) 

## <a name="global-archi"></a>Global architecture    
![global architecture](/docs/images/archi_globale.png)

## Model of object-oriented database   
![UML](/docs/images/uml.png)

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

## <a name="development"></a>Development
## <a name="test"></a>Testing
## <a name="production"></a>Production

