# Projet : Système de Casiers Connectés

## Introduction

Le projet **Système de Casiers Connectés** a été conçu pour répondre à une question essentielle : **"Comment rendre la vie étudiante meilleure ?"**. En réfléchissant en groupe, nous avons identifié un besoin réel d'organiser et de simplifier le quotidien des étudiants. Les casiers connectés sont une solution moderne et pratique, permettant aux étudiants d'avoir un accès facile et sécurisé à leurs affaires, tout en intégrant des fonctionnalités intelligentes telles que :

- **Ouverture à distance.**
- **Gestion des mots de passe.**
- **Consultation de l'état et du contenu des casiers.**
- **Historique des actions.**

Le projet est entièrement fonctionnel et peut être utilisé pour améliorer la gestion des casiers dans les universités ou autres institutions.

---

## Fonctionnalités

1. **Accès distant :**
   - Les utilisateurs peuvent ouvrir ou fermer leur casier via une interface web.
2. **Sécurité renforcée :**
   - Chaque casier est protégé par un mot de passe personnalisé que l'utilisateur peut modifier.
3. **Indicateur d'état :**
   - Visualisation en temps réel de l'état des casiers (« Occupé » ou « Libre »).
4. **Historique des actions :**
   - Suivi des ouvertures, des réinitialisations et des modifications apportées aux casiers.
5. **Design réactif :**
   - Une interface adaptée à tous les appareils (ordinateur, tablette, smartphone).
6. **Notifications :**
   - Notifications dynamiques en cas de succès ou d'erreur lors des actions.

---

## Technologies Utilisées

- **Frontend :** React.js
- **CSS :** pour le design et les animations.
- **Backend :** Simulation avec des données locales (JSON).
- **Gestion des états :** React Hooks (useState, useEffect).

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure).
- Un éditeur de texte comme [Visual Studio Code](https://code.visualstudio.com/).

---

## Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/votre-repo/connected-lockers.git
   ```

2. **Accéder au dossier du projet :**
   ```bash
   cd connected-lockers
   ```

3. **Installer les dépendances :**
   ```bash
   npm install
   ```

---

## Lancer l'application

1. **Démarrer le serveur local :**
   ```bash
   npm start
   ```

2. **Accéder à l'application dans le navigateur :**
   - Rendez-vous sur [http://localhost:3000](http://localhost:3000).

---

## Structure du Projet

```
connected-lockers/
├── public/
│   ├── favicon.ico         # Icône du site
│   ├── index.html          # Fichier HTML principal
│   ├── logo192.png         # Logo (192x192)
│   ├── logo512.png         # Logo (512x512)
│   ├── manifest.json       # Manifest pour PWA
│   └── robots.txt          # Fichier robots.txt
├── src/
│   ├── composants/
│   │   ├── LockerDashboard.js  # Tableau de bord principal
│   │   ├── LockerDetails.js    # Détails d'un casier
│   │   ├── SearchBar.js        # Barre de recherche
│   │   └── students.js         # Données des étudiants
│   ├── css/
│   │   ├── LockerDashboard.css # Styles CSS du tableau de bord
│   │   ├── LockerDetails.css   # Styles CSS des détails
│   │   └── SearchBar.css       # Styles CSS de la barre de recherche
│   ├── App.css                 # Styles globaux
│   ├── App.js                  # Composant principal
│   ├── App.test.js             # Tests unitaires
│   ├── index.js                # Point d'entrée de l'application
│   ├── logo.svg                # Logo SVG
│   ├── reportWebVitals.js      # Rapport des performances
│   └── setupTests.js           # Configuration des tests
├── .gitignore                  # Fichiers à ignorer par Git
├── package-lock.json           # Verrouillage des dépendances
├── package.json                # Configuration du projet
├── README.md                   # Documentation du projet
└── yarn.lock                   # Verrouillage des dépendances Yarn
```

---

## Fonctionnement de l'Application

### 1. Tableau de Bord Principal
- **Objectif :** Afficher tous les casiers disponibles.
- Les casiers sont affichés sous forme de cartes dynamiques contenant :
  - Le nom de l'étudiant.
  - L'état du casier (« Libre » ou « Occupé »).
  - Un bouton pour accéder au casier.

### 2. Barre de Recherche
- **Objectif :** Permettre de filtrer les casiers par nom d'étudiant.
- Recherche dynamique : les résultats s'actualisent à chaque frappe.

### 3. Accès au Casier
- Lorsque l'utilisateur clique sur « Accéder au casier » :
  - Une modale s'affiche pour entrer le mot de passe.
  - En cas de succès, le casier passe en état « Occupé ».
  - En cas d'erreur, une notification signale que le mot de passe est incorrect.

### 4. Historique des Actions
- **Objectif :** Suivre toutes les interactions avec les casiers.
- Affiche les actions (ouvertures, réinitialisations) avec la date et l'heure.

### 5. Notifications
- Les notifications apparaissent dans le coin inférieur droit :
  - « Succès : Casier ouvert » (vert).
  - « Erreur : Mot de passe incorrect » (rouge).
  - Les notifications disparaissent après 5 secondes.

### 6. Mode Clair/Sombre
- Un bouton permet de basculer entre un thème clair et un thème sombre.
- Le thème est appliqué à toute l'interface.

---

## Exemples de Code

### Exemple : Données des étudiants
```javascript
const students = [
    { id: 1, name: 'Alexandre Dupuis', age: 22, campus: 'Paris' },
    { id: 2, name: 'Marie Curie', age: 24, campus: 'Lyon' },
    // Ajoutez d'autres étudiants ici
];
export default students;
```

### Exemple : Composant LockerDashboard
```javascript
import React, { useState } from 'react';
import students from '../composants/students';

function LockerDashboard() {
    const [searchText, setSearchText] = useState('');

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher un étudiant"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <div>
                {filteredStudents.map(student => (
                    <div key={student.id}>{student.name}</div>
                ))}
            </div>
        </div>
    );
}

export default LockerDashboard;
```

---

## Améliorations Futures

- Intégration avec une base de données (ex. Firebase ou MongoDB).
- Ajout d'une API backend pour la gestion des casiers.
- Notifications en temps réel via WebSocket.
- Possibilité de gérer plusieurs utilisateurs avec des rôles (admin, étudiant).

---

## Auteur
Ce projet a été réalisé par Kais  dans le cadre d'un projet universitaire visant à résoudre des problèmes concrets de la vie étudiante.

---

## Remerciements
Nous remercions les professeurs, mentors et camarades qui ont apporté leur soutien au développement de ce projet.

