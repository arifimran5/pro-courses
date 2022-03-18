import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '../../utils/supabaseinit';

const UserContext = createContext({ user: null, session: null });

export const UserContextProvider = (props) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function logout() {
    await supabase.auth.signOut();
  }

  const getUserNameFromEmail = (email) => {
    const name = email.split('@')[0];
    return name;
  };

  const value = {
    session,
    user,
    logout,
    username: getUserNameFromEmail(user?.email ?? ''),
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
