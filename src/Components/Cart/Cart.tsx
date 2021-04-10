import React, { useState, useEffect } from 'react';
import { ItemInCartType } from '../../App';
import styles from './Cart.module.css';

type CartProps = {
  itemsInCart: ItemInCartType[]
};

// Lists the items that would be purchased along with total price
const Cart = ({ itemsInCart }: CartProps) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sumOfItemPrice = 0;
    itemsInCart && itemsInCart.forEach(item => {
      sumOfItemPrice = sumOfItemPrice + item.price;
    })
    setTotalPrice(sumOfItemPrice);
  }, [totalPrice]);
  
  if (!itemsInCart || itemsInCart.length === 0) {
    return (<div className={styles.noItemsInCheckout}>No items in checkout</div>);
  }
    
  return (
    <div className={styles.cart}>
      {itemsInCart && itemsInCart.map((item, index) => 
        <div data-testid={item.description} className={styles.cartItem} key={index}>
          <p>Item name: {item.description}</p>
          <p>Item cover color: {item.color}</p>
          <p>Item paper type: {item.paperType}</p>
          <p>Item slip case included: {item.slipCaseIncluded}</p>
          <p>Item price: {item.price}</p>
        </div>
      )}
      <div data-testid="totalPriceId" className={styles.cartItem}>
        Total price: {totalPrice}
      </div>
    </div>
  );
};

export default Cart;