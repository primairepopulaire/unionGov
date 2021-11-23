# Installation sur RaspBerry PI 4

### Table des matières
[Pré-requis](#pre-requis)  
[Install](#install)  
[Test](#test)  
 

## <a name="pre-requis"></a>Pré requis    

1. Installation avec Raspberry Pi OS Lite [PI OS Lite](https://raspberry-pi.fr/download/raspbian_lite_latest.zip)
2. Mise à jour
```
sudo apt-get update
sudo apt-get upgrade
```
3. Installation de Git
```
sudo apt-get install git
```
4. Installation de docker compose
Voir [Installation de Docker et Docker compose sur RaspBerry PI](https://code4pi.fr/2020/09/docker-et-docker-compose-sur-raspberry-pi/)

## <a name="install"></a>Install
1. Création du repo local de la branche de dev de cantenej
```
mkdir pp
cd pp
git clone https://github.com/cantenej/unionGov
```
2. Remplir fichier env
```
SECRET_KEY=lkv1p'-s.~~S3%Sp.1tUW;ZN6wL"I_u:KLQ5/B3i5#=3OugXhqz.|\tId5|oRF"e
DB_HOST=db
DB_NAME=uniongov
DB_USER=postgres
DB_PASSWORD=M6OEKhQiG19lsysvNA3B
DB_DIR=./data/db
DB_PORT=5432
```
3. Lancer docker-compose
```
sudo docker-compose -f docker-compose.dev.yml build
```
Puis
```
sudo docker-compose -f docker-compose.dev.yml build
```

## <a name="test"></a>Testing
Se connecter avec un navigateur sur localhost:9000
