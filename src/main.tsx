import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as JotaiProvider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import '@/services/firebase';
import { registerServiceWorker } from '@/services/firebase/notification';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import App from '@/App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}
