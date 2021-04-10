import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductConfigurator from './Components/ProductConfigurator/ProductConfigurator';
import Cart from './Components/Cart/Cart';
import { productOptionsData } from './Util/productOptionsData';

export type ItemInCartType = {
  color: string;
  paperType: string;
  slipCaseIncluded: boolean;
  description: string;
  price: number;
};


const App = () => {
  const [itemsInCart, setItemsInCart] = useState([] as Array<ItemInCartType>);

  const addItemInCart = (item: ItemInCartType) => {
    const updatedItemsInCart: Array<ItemInCartType> = itemsInCart;
    updatedItemsInCart.push(item);
    setItemsInCart(updatedItemsInCart);
  };
  
  return (
    <>
      <Router>
        <Switch>
          <Route path="/configure-product">
            <ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />
          </Route>
          <Route path="/cart">
            <Cart itemsInCart={itemsInCart} />
          </Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;
