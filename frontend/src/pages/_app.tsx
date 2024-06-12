import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ApolloProvider } from '@apollo/client';
import AlertProvider from '@/contexts/AlertContext';
import client from '@/graphql/client';
import { UserProvider } from '@/contexts/UserContext';

export function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
