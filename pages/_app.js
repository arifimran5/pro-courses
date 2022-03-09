import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';
import { supabase } from '../utils/supabaseinit';
import { UserContextProvider } from '../components/context/auth.context';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }
  return (
    <UserContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  );
}

export default MyApp;
