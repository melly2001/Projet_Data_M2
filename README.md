# Guide d'installation du projet

## Structure du projet

- La partie back-end repose sur un serveur **Python Flask**
    - Le code du serveur flask: `/serveur.py`
    - Le code Python permettant les calculs ainsi que la génération des figures Plotly: `/src/`
    - Un **notebook Jupyter** permettant la démonstration du code python et son fonctionnement: `notebook_demo.ipynb`
- La partie front-end est développée en **React.JS**
    - L'application React est contenue dans le dossier `/projet_data_react_app`

## Prérequis

- **Python** installé sur votre système
- **Pip** pour installer des bibliothèques python
    - `pip install numpy pandas matplotlib yfinance sklearn Flask flask-cors`
- **Node.JS**: 
    - Windows: Télécharger et exécuter https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi
    - Linux: 
        - `wget https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz`
        - décompresser le fichier tar.xz
        - `export PATH=path_to_file/node-v20.11.1-linux-x64/bin:$PATH`

## Installer l'application React.JS
- `cd projet_data_react_app`
- `npm install`

## Démarrer le serveur de développement React.JS
- `cd projet_data_react_app`
- `npm start`

## Démarrer le serveur python
- `cd projet_data`
- `python server.py`

## Utiliser le projet
- Une fois le serveur python et le serveur de développement react démarrés, il suffit de se connecter à l'url: http://localhost:3000/ (url par défaut)

## Vidéo de démonstration
https://drive.google.com/file/d/1r-fcRMgnaabRmvBzSOIAonlan51I2eI1/view?usp=sharing

## Auteurs
- Melissa MEDJAHED
- Liticia OUAHIOUNE
- Hicham HADRANE