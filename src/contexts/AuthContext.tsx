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
  const [admins, setAdmins] = useState<string[]>([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
    const fetchMetaData = async () => {
      const refMetaData = db.collection("inventory").doc("meta_data");
      try {
        const docMetaData = await refMetaData.get();
        if (docMetaData.exists) {
          setAdmins(docMetaData.data()?.admins);
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    fetchMetaData();
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
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const isAdminUser = useMemo(() => {
    if (!user || !admins?.length) return false;
    return admins.includes(user.uid);
  }, [user, admins]);
  return <AuthContext.Provider value={{ user, signIn, signOut, isAdminUser }}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
