import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ApolloProvider } from '@apollo/client';
import AlertProvider from '@/contexts/AlertContext';
import client from '@/graphql/client';

export function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
