import { useEffect } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import ShoppingCartContextProvider from './store/shopping-cart-context.jsx';
import { useTheme } from './store/ThemeContextProvider.jsx';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return (
    <div className={theme}>
      <ShoppingCartContextProvider>
        <Header />
        <Shop />
      </ShoppingCartContextProvider>
    </div>
  );
}

export default App;
