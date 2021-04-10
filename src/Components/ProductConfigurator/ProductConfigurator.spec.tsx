import { fireEvent, render } from '@testing-library/react';
import ProductConfigurator from './ProductConfigurator';
import { productOptionsData } from '../../Util/productOptionsData';

const addItemInCart = jest.fn();

describe('ProductConfigurator', () => {
  it('should show the available cover colors in the drop down', () => {
    const { getByTestId } = render(<ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />);
    expect(getByTestId("red")).toBeDefined();
    expect(getByTestId("blue")).toBeDefined();
  })

  it('should show the available paper type in the drop down', () => {
    const { getByTestId } = render(<ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />);
    expect(getByTestId("dotted")).toBeDefined();
    expect(getByTestId("lined")).toBeDefined();
  })

  it('should show the price of the default handbook selected', () => {
    const { getByTestId } = render(<ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />);
    expect(getByTestId("price").innerHTML).toEqual("17");
  })

  it('should change the cover color based on the user selection', () => {
    const { getByTestId } = render(<ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />);
    fireEvent.change(getByTestId("cover-color"), { target: { value: "blue" } });
    expect(getByTestId("blue").selected).toBeTruthy();
    expect(getByTestId("red").selected).toBeFalsy();
  })

  it('should change the paper type based on the user selection', () => {
    const { getByTestId } = render(<ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />);
    fireEvent.change(getByTestId("dotted"), { target: { value: "dotted" } });
    expect(getByTestId("lined").selected).toBeFalsy();
    expect(getByTestId("dotted").selected).toBeTruthy();
  })

  it('should change the slip case included value based on the user selection', () => {
    const { getByTestId } = render(<ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />);
    fireEvent.change(getByTestId("slip-case-included"), { target: { checked: true } });
    expect(getByTestId("slip-case-included").checked).toBeTruthy();
  })

  it('should add item to the cart', () => {
    const { getByTestId } = render(<ProductConfigurator productsList={productOptionsData} addItemInCart={addItemInCart} />);
    fireEvent.click(getByTestId("addItemToCart"));
    expect(getByTestId("item-added")).toBeDefined();
  })
})