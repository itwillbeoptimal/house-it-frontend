import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import PWABadge from '@/PWABadge';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PWABadge />
    </ThemeProvider>
  );
}

export default App;
