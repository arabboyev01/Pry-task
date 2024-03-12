import type { AppProps } from 'next/app'
import '../main.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StoreProvider } from '../state'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <StoreProvider>
                <Component {...pageProps} />
            </StoreProvider>
        </QueryClientProvider>
    )
}