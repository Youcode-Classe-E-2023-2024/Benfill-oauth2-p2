# Projet Back-Office pour système d'authentification OAuth2

Ce projet consiste à développer une interface graphique pour servir de back-office à un système d'authentification OAuth2. L'interface fournira des fonctionnalités de gestion des utilisateurs, des rôles et des permissions, ainsi que des fonctionnalités d'authentification telles que la connexion, l'inscription, la réinitialisation et l'oubli du mot de passe.

---

## Fonctionnalités

### Interface d'authentification
- **Connexion:** Permet aux utilisateurs de se connecter en utilisant leurs identifiants.
- **Inscription:** Permet aux nouveaux utilisateurs de s'inscrire en fournissant les informations requises.
- **Mot de passe oublié:** Permet aux utilisateurs de réinitialiser leur mot de passe s'ils l'ont oublié.
- **Réinitialisation du mot de passe:** Permet aux utilisateurs de réinitialiser leur mot de passe en cas de besoin.

### Interface des utilisateurs
- **Index:** Affiche la liste des utilisateurs avec des fonctionnalités spécifiques aux administrateurs comme le bannissement et la réintégration des utilisateurs.

### Interface des rôles (Administrateur)
- **Index:** Affiche la liste des rôles existants.
- **Gestion:** Permet à l'administrateur de créer, modifier ou supprimer des rôles.
- **Assigner un utilisateur:** Permet à l'administrateur d'attribuer des rôles à des utilisateurs spécifiques.

### Interface des permissions (Administrateur)
- **Index:** Affiche la liste des permissions disponibles.
- **Gestion:** Permet à l'administrateur de créer, modifier ou supprimer des permissions.
- **Assigner un rôle:** Permet à l'administrateur d'attribuer des permissions à des rôles spécifiques.

---

## Technologies Utilisées
Ce projet utilise ReactJS pour le développement de l'application frontend.

---

## Comment Contribuer
Ce projet est ouvert aux contributions de la communauté. Si vous souhaitez contribuer, veuillez suivre ces étapes:
1. Clonez ce dépôt sur votre machine locale.
2. Créez une nouvelle branche pour votre fonctionnalité (`git checkout -b feature/nom-de-la-fonctionnalité`).
3. Faites vos modifications et committez-les (`git commit -am 'Ajoutez une nouvelle fonctionnalité'`).
4. Poussez votre branche sur votre dépôt distant (`git push origin feature/nom-de-la-fonctionnalité`).
5. Ouvrez une demande de fusion (Pull Request) et décrivez vos modifications en détail.

---

## Licence
Ce projet est sous licence [MIT](LICENSE).

---
Ce README sera mis à jour au fur et à mesure que le projet évolue.
