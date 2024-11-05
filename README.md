# Getting Started with the React Bug Shop Demo

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/kamranayub/pluralsight-course-react-debugging)

# README - Explication des Corrections

## 1. Explication des Corrections

### Valeurs par défaut des propriétés :
- Des valeurs par défaut ont été définies pour `inventoryCount`, `rating`, `reviewCount`, et `popularity` dans le composant `UnseenUmbrellaMoth` afin de gérer les cas où ces propriétés sont `null` ou `undefined`.

### Validation des types de propriétés (`PropTypes`) :
- Des validations de types ont été ajoutées à chaque composant pour garantir que les données passées respectent les types attendus.

---

## 2. Explication des Corrections

### Gestion de l'état dans `LikeButton` :
- Utilisation de `useState` pour gérer les changements de `likeValue`, car React nécessite une gestion d'état pour que le rendu soit correct après les modifications.

### Mise à jour des attributs immuables :
- Création de l'état `currentAttributes` recalculé en fonction du niveau, ce qui permet de conserver les propriétés passées sans modification, respectant ainsi le principe d'immuabilité de React.

### Dépendances dans `useEffect` :
- Ajout de `level` comme dépendance dans le hook `useEffect` pour recalculer `currentAttributes` à chaque changement de niveau, garantissant ainsi une réinitialisation correcte des attributs au niveau 1.

---

## 4. Explication des Corrections

### Initialisation et mise à jour de l'état :

- **Correction de `useState` :** Dans le composant `ShySpider`, l'état `purchaseLevel` est désormais correctement initialisé avec `useState(props.level)`. Le niveau est mis à jour dans le composant parent à chaque changement dans le composant enfant (`BugAttributes`).
  
- **État dans `BugAttributes` :** L'état `currentLevel` dans `BugAttributes` est initialisé avec `useState(initialLevel)` et mis à jour correctement avec `setCurrentLevel`, ce qui évite les changements d'état imprévus.

### Gestion des mises à jour de l'état :

- **Gestion du niveau :** Le niveau est mis à jour via `setCurrentLevel`, et les modifications sont propagées vers le parent avec `onLevelChange`, assurant la synchronisation entre le parent et l'enfant.

- **Propagation de l'état :** Le `purchaseLevel` est passé à `BugAttributes` depuis `ShySpider` et toute modification dans `BugAttributes` est renvoyée vers le parent.

### Interaction avec les boutons :

- **Logique d'augmentation et de diminution du niveau :** Les fonctions `onLevelUp` et `onLevelDown` gèrent maintenant correctement les changements de `currentLevel` en utilisant `setCurrentLevel`, garantissant que l'UI se met à jour correctement.

### Résumé de l'achat :

- Le composant `PurchaseSummary` affiche correctement le niveau à partir de `purchaseLevel` passé en tant que propriété. Le rendu est conditionnel en fonction de la présence d'un `purchaseLevel` valide.

---

## 5. Explication

### Fonction de suivi débouncée :
- Utilisation d'une version débouncée de la fonction `track` pour limiter la fréquence d'envoi des événements d'analyse, afin d'éviter de surcharger le système.

### Test amélioré :
- Le test vérifie désormais que le nombre d'événements est strictement supérieur à 0 et inférieur à 6, garantissant que les événements sont envoyés de manière contrôlée sans excès.

---

## 6. Explications

### Gestion de l'état pour le mode strict :
- L'état `isStrictMode` suit l'activation du mode strict et est passé à `MountCounter` pour loguer les messages de montage conditionnellement.

### Journalisation conditionnelle dans `MountCounter` :
- Le `console.log` dans `MountCounter` vérifie la propriété `isStrictMode`. Si le mode strict est activé, le message de montage est logué, sinon il est ignoré.

### Dépendances d'effet :
- Le `useEffect` dans `MountCounter` a été mis à jour pour inclure `isStrictMode` dans ses dépendances, permettant de prendre en compte les changements dans le mode strict.

---

## 7. Explications

### Test de la quantité :
- Le test dans `useBugTest` vérifie que la quantité peut être mise à jour à 10. L'utilisateur peut cliquer sur le bouton "+" pour atteindre une quantité de 10.

### Calcul du prix :
- La fonction `recalculatePrice` utilise `parseCurrencyAsAmount` pour convertir correctement le prix et calculer le total en fonction de la quantité.

### Boucle coûteuse évitée :
- L'ancienne implémentation utilisait une boucle coûteuse dans `parseCurrencyAsAmount`, ce qui a été supprimé pour améliorer les performances et éviter les effets de "rendu retardé".

### Mise à jour de l'état :
- La fonction `setQuantity` gère correctement l'augmentation ou la diminution de la quantité tout en respectant les limites (1 à 100) définies par les propriétés des boutons.

---

## 8. Explications

### Logique de limite de quantité :
- Utilisation de `Math.max(1, quantity - 1)` et `Math.min(100, quantity + 1)` pour garantir que la quantité ne dépasse pas 100 ni ne descende en dessous de 1, indépendamment des interactions utilisateur.

### Logique de remise sur volume :
- Le composant `VolumeDiscount` est rendu conditionnellement selon le résultat de la fonction `isVolumeDiscount(quantity)` qui détermine si la remise s'applique.

### Tests :
- Le test dans `useBugTest` vérifie que la quantité peut être augmentée jusqu'à 50. L'utilisateur peut cliquer sur le bouton "+" pour atteindre cette quantité.

### Formatage et analyse :
- La fonction `parseCurrencyAsAmount` assure un arrondi correct des montants, améliorant ainsi la précision des calculs.

---

## 9. Fonction `refetch()` débouncée

### Hook `useDebouncedRefetch` :
- Le hook `useDebouncedRefetch` est utilisé pour appeler `refetch()` avec un délai de 300ms lors du changement de quantité, évitant ainsi des appels réseau inutiles.

### Utilisation de `useCallback` et `useRef` :
- Cette combinaison garantit que la fonction débouncée reste stable entre les re-rendus, améliorant ainsi les performances.

### Rendu conditionnel du sélecteur de quantité :
- Le `QuantityPicker` ne se rend que lorsque la propriété `show` est vraie, minimisant ainsi les rendus inutiles et les appels `refetch` trop fréquents.




The fastest way to jump into the demo experience and solve the challenges is by running in the GitHub Codespace which is a preconfigured development environment with everything you need to follow along with the course.

Once you're in, simply run:

    npm start

To start the dev server, and Codespaces will prompt you to open a hosted URL in the browser to view the app.

Alternatively, you can clone the project locally and configure your own local dev environment.

## Solving the Challenges

The goal is to catch all the bugs in the shop. Each bug comes with a set of checks you need to make pass. You'll need to refactor and update the code.

The videos in the course provide the solutions to each challenge but there are often multiple ways to solve a problem with React. If you're stuck, reference the videos or explore on your own!

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
