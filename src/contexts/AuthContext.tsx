import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { db, firebase, googleAuth } from "../api/firebase";

type AuthType = {
  user?: firebase.User | null;
  signIn?: () => Promise<void>;
  signOut?: () => Promise<void>;
  isAdminUser?: boolean;
};
const AuthContext = React.createContext<AuthType>({});

const useAuth = (): AuthType => useContext(AuthContext);

type Props = {
  children: any;
};
function AuthProvider({ children }: Props): JSX.Element {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [users, setUsers] = useState<firebase.firestore.DocumentData>({});
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
    const fetchUsers = async () => {
      const refUsers = db.collection("users");
      try {
        const snapshot = await refUsers.get();
        if (snapshot.empty) console.log("No such document!");
        const data: firebase.firestore.DocumentData = {};
        snapshot.forEach((doc) => (data[doc.id] = doc.data()));
        setUsers(data);
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    fetchUsers();
  }, []);
  const signIn = useCallback(async () => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const result = await firebase.auth().signInWithPopup(googleAuth);
      setUser(result.user);
    } catch (e) {
      console.log(e);
    }
  }, [setUser]);
  const signOut = useCallback(async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const isAdminUser = user && users[user.uid]?.admin;
  return <AuthContext.Provider value={{ user, signIn, signOut, isAdminUser }}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
