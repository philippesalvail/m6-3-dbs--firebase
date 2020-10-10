import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyCwqjoWJtPpAeP4lknlwwP1VWXFKjNMLxY",
  authDomain: "user-app-a036d.firebaseapp.com",
  databaseURL: "https://user-app-a036d.firebaseio.com",
  projectId: "user-app-a036d",
  storageBucket: "user-app-a036d.appspot.com",
  messagingSenderId: "566141091674",
  appId: "1:566141091674:web:1709b074629af164cd7d63",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };
  React.useEffect(() => {
    if (user) {
      setAppUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, [user]);
  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle, handleSignOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
