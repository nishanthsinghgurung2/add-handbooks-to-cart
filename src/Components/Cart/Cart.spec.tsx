import { render } from "@testing-library/react";
import { ItemInCartType } from "../../App";
import Cart from "./Cart";


const cartItems: Array<ItemInCartType> = [
  {
    color: 'blue',
    paperType: 'dotted',
    slipCaseIncluded: false,
    description: 'Ocean notebook with dotted paper',
    price: 10
  },
  {
    color: 'red',
    paperType: 'dotted',
    slipCaseIncluded: true,
    description: 'Sunset notebook with dotted paper and Slipcase',
    price: 20
  },
  {
    color: 'red',
    paperType: 'lined',
    slipCaseIncluded: true,
    description: 'Sunset notebook with lined paper',
    price: 30
  }
];

describe('Cart', () => {
  it('should show the list of items in the cart', () => {
    const { getByTestId } = render(<Cart itemsInCart={cartItems} />);
    expect(getByTestId('Ocean notebook with dotted paper')).toBeDefined();
    expect(getByTestId('Sunset notebook with dotted paper and Slipcase')).toBeDefined();
    expect(getByTestId('Sunset notebook with lined paper')).toBeDefined();
  })

  it('should calculate the total price of items in the cart', () => {
    const { getByTestId } = render(<Cart itemsInCart={cartItems} />);
    expect(getByTestId("totalPriceId").innerHTML).toEqual("Total price: 60");
  })
})