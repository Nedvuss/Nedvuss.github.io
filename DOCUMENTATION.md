# Portfolio | François Chamosset

Ce document technique décrit la structure, les fonctionnalités et les technologies utilisées dans le portfolio.

## Structure du Projet

Le projet a été restructuré pour une meilleure lisibilité et séparer les responsabilités :

```text
/
├── index.html         # Point d'entrée principal (structure sémantique)
├── DOCUMENTATION.md   # Documentation de l'architecture et du projet
├── css/
│   └── style.css      # Feuille de style (Responsive, Thème Terminal)
├── js/
│   └── script.js      # Logique JavaScript (Traduction, Animations, Snake)
└── assets/
    └── CV.pdf         # Curriculum Vitae téléchargeable
```

## Fonctionnalités Principales

1. **Thème "Terminal"** : Interface sobre et orientée développement avec des effets de néon vert et une police monospace (`Share Tech Mono`) rappelant un environnement console.
2. **Système de Traduction (FR / EN)** : 
   - Un bouton dans la barre de navigation permet de basculer la langue.
   - La préférence de l'utilisateur est stockée en local via le `localStorage`.
   - Les éléments à traduire sont identifiés dans le HTML via les attributs `data-i18n`.
3. **Machine à Écrire (Typewriter Effect)** : Titre d'introduction interactif et dynamique, supportant les transitions de traduction immédiates sans se briser.
4. **Easter Egg Caché**

## Technologies Utilisées

- **HTML5** Sémantique.
- **CSS3 Vanilla** (Grid/Flexbox, Variables CSS, Animations, Media Queries).
- **JavaScript Vanilla** (Gestion du DOM, `localStorage`, balise `<canvas>`, écouteurs d'événements).
- Aucun framework lourd n'est utilisé afin de garantir des temps de chargement ultra-rapides et des performances optimales.
