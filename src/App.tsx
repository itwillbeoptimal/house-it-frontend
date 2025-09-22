import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import PWABadge from '@/PWABadge';
import Layout from '@/components/Layout';
import Magazine from '@/pages/Magazine';

function App() {
  return (
    <JotaiProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/magazine" element={<Magazine />} />
            </Route>
          </Routes>
        </Router>
        <PWABadge />
      </ThemeProvider>
    </JotaiProvider>
  );
}

export default App;
