import { useRef, useContext } from 'react';

import CartModal from './CartModal.jsx';

import { ShoppingCartContext } from '../store/shopping-cart-context.jsx';
import { ThemeContext } from '../store/ThemeContextProvider.jsx'; 

export default function Header() {
  const { items } = useContext(ShoppingCartContext);
  const modal = useRef();
  const { toggleTheme } = useContext(ThemeContext);

  const cartQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Demo Website" />
          <h2>Demo Website</h2>
        </div>
        <div class="buttons">
           <button onClick={toggleTheme}>
            Toggle Theme
          </button>
          <button onClick={handleOpenCartClick}>
            Cart ({cartQuantity})
          </button>
        </div>
      </header>
    </>
  );
}
