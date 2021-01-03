# Inventory App
An inventory management and display application build using Firebase and React.

## Getting Started
These instructions will help you run a copy of this project on your system.

### Requirements
You need the following application installed on your system to run this project.
- node ~12.18.1
- yarn ~1.22.0
- firebase-tools ~9.1.0

### Firebase
1. Create a project on the Firebase console.
2. Enter the project ID in the `.firebaserc` file.
3. Enable Google sign-in in "Firebase console" > "Authentication" > "Sign-in method".
4. Create 3 collections in Cloud Firestore called `headers`, `items` and `users`.

### Installation
You can install the node dependencies required by the application with the following command:
```shell script
yarn install
```

### Testing
The unit tests are present in the `__tests__` directory.
You can run the tests with the following command:
```shell script
yarn test
```

### Development
To start the application in development mode run the following command.
```shell script
yarn start
```
This will start the webpack-dev-server application.

### Production
Run the following command to bundle the application using webpack in production mode.
```shell script
yarn build
```

## Deployment
The project uses Firebase Firestore and Hosting services which can be deployed using this command:
```shell script
yarn build
firebase deploy
```
It will deploy the `firestore.rules` and `firestore.indexes.json` and also deploy the `build` directory on the hosting service.

## Build With
* [React](https://reactjs.org/) - The frontend library used
* [Firebase](https://firebase.google.com/) - Backend service provider
* [Webpack](https://webpack.js.org/) - Asset bundling tool

## Authors

* **Surya Kant Bansal** - *Initial work* - [skb1129](https://github.com/skb1129)
