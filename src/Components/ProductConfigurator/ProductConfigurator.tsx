import React, { useCallback, useEffect, useState } from 'react';
import Book from '../Book/Book';
import styles from './ProductConfigurator.module.css';
import { ItemInCartType } from '../../App';
import { useHistory } from 'react-router-dom';

type Attribute = {
  id: string;
  type: string;
  value: string | boolean;
  label: string;
};

type Product = {
  id: string;
  productGroupLabel: string;
  productGroupId: string;
  itemDescription: string;
  attributes: Array<Attribute>;
  price: number;
}

type ProductList = {
  productsList: {
    products: Array<Product>
  };
  addItemInCart: (item: ItemInCartType) => void
};

// Main component that allows user to customize the product
const ProductConfigurator = ({ productsList, addItemInCart }: ProductList) => {
  const uniqueCoverColors: Array<string> = [];
  const uniquePaperTypes: Array<string> = [];
  
  const getFirstProduct = productsList &&
    productsList.products &&
    productsList.products.length > 0 &&
    productsList.products[0];

  // Extracts the cover color to be populated in the drop down
  const getUniqueCoverColor = () => {
    productsList.products && productsList.products.forEach(product => {
      product.attributes && product.attributes.forEach(attribute => {
        if (
          attribute.type === 'cover-colour' &&
          typeof attribute.value !== "boolean" &&
          !uniqueCoverColors.includes(attribute.value)) {
          uniqueCoverColors.push(attribute.value);
        }
      });
      
    });
  };

  // Extracts the paper types to be populated in the drop down
  const getUniquePaperTypes = () => {
    productsList.products && productsList.products.forEach(product => {
      product.attributes && product.attributes.forEach(attribute => {
        if (
          attribute.type === 'paper-type' &&
          typeof attribute.value !== "boolean" &&
          !uniquePaperTypes.includes(attribute.value)) {
          uniquePaperTypes.push(attribute.value);
        }
      });
      
    });
  };

  const [selectedItemDescription, setSelectedItemDescription] = useState(getFirstProduct? getFirstProduct.itemDescription : '');
  const [selectedCoverColor, setSelectedCoverColor] = useState('');
  const [selectedPaperType, setSelectedPaperType] = useState('');
  const [slipCaseIncluded, setSlipCaseIncluded] = useState(false);
  const [selectedItemPrice, setSelectedItemPrice] = useState(getFirstProduct ? getFirstProduct.price : 0);
  const [showItemAddedToCartMessage, setshowItemAddedToCartMessage] = useState(false);

  // Returns true if the attributes matches with the one in the local state
  const checkIfAllAttributeMatches = (attributes: Array<Attribute>) => {
    let matchedAttributes = 0;
    attributes && attributes.forEach(attribute => {
        if (
          (attribute.type === "cover-colour" &&
          attribute.value === selectedCoverColor) ||
          (attribute.type === "paper-type" &&
          attribute.value === selectedPaperType) ||
          (attribute.type === "slip-case-included" &&
          attribute.value === slipCaseIncluded)
        ) {
          matchedAttributes++;
        }
    })
    return Array.isArray(attributes) && attributes.length === matchedAttributes;
  };

  // Updates the item description and item price in the state
  const updateProductInformation = () => {
    productsList.products && productsList.products.some(product => {
      if (checkIfAllAttributeMatches(product.attributes)) {
        setSelectedItemDescription(product.itemDescription);
        setSelectedItemPrice(product.price);
        return true;
      }
    });
  };

  getUniqueCoverColor();
  getUniquePaperTypes();
  
  // Executes only once when the component initally mounts on the DOM.
  // Here we calculate the initialazation values for the various slices of states.
  useEffect(() => {
    if (getFirstProduct && Array.isArray(getFirstProduct.attributes)) {
      getFirstProduct.attributes.forEach(attribute => {
        if (attribute.type === 'paper-type') {
          setSelectedPaperType(attribute.value.toString());
        } else if (attribute.type === 'cover-colour') {
          setSelectedCoverColor(attribute.value.toString());
        } else if (attribute.type === 'slip-case-included') {
          if (typeof attribute.value === 'boolean') {
            setSlipCaseIncluded(attribute.value);  
          } else if (typeof attribute.value === 'string') {
            setSlipCaseIncluded(attribute.value === 'true');  
          }
        }
      });
      };
  }, [])
  
  // The product information state values are updated when one of the selectedPaperType, selectedCoverColor, slipCaseIncluded changes
  useEffect(() => {
    updateProductInformation();
  },[selectedPaperType, selectedCoverColor, slipCaseIncluded])
  
  // Updates the cover color in the state
  const updateColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoverColor(e.target.value);
  };

  // Updates the paper type in the state
  const updatePaperType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaperType(e.target.value);
  };

  // Updates the slip case in the state
  const updateSlipCase = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlipCaseIncluded(e.target.checked);
  };

  // Adds the item to the cart 
  const sendItemToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addItemInCart({
      color: selectedCoverColor,
      paperType: selectedPaperType,
      slipCaseIncluded: slipCaseIncluded,
      description: selectedItemDescription,
      price: selectedItemPrice
    });
    setshowItemAddedToCartMessage(true);
    setTimeout(() => setshowItemAddedToCartMessage(false), 1000);
  };
  
  const history = useHistory();
  const goToCheckout = useCallback(() => history.push('/cart'), [history])

  if (!uniqueCoverColors || !uniquePaperTypes) {
    return (<div className={ styles.noBooksToShow }>No book to show</div>);
  }

  return (
    <div className={styles.productConfiguratorContainer}>
      <Book color={selectedCoverColor} />
      <form className={styles.productConfiguratorForm}>
        <h2>{productsList.products.length > 1 ? productsList.products[0].productGroupLabel : "Book"}</h2>
        <p>{selectedItemDescription}</p>
        <div className={styles.productConfiguratorFormElement}>
          <label htmlFor="cover-color">Cover color</label>
          <select data-testid="cover-color" id="cover-color" aria-label="Cover color" name="cover-color" onChange={updateColor}>
            {uniqueCoverColors.map(color => <option data-testid={color} key={color}>{ color }</option>)}
          </select>
        </div>
        
        <div className={styles.productConfiguratorFormElement}>
          <label htmlFor="paper-type">Paper type</label>
          <select data-testid="paper-type" id="paper-type" aria-label="Paper type" name="paper-type" onChange={updatePaperType}>
          {uniquePaperTypes.map(paperType => <option data-testid={paperType} key={paperType}>{ paperType }</option>)}
          </select>
        </div>
        
        <div className={styles.productConfiguratorFormElement}>
          <label htmlFor="slip-case-included">Slip case included</label>
          <input type="checkbox" data-testid="slip-case-included" aria-label="Slip case included" id="slip-case-included" name="slip-case-included" onChange={updateSlipCase} />
        </div>
        
        <div data-testid="price" className={styles.productConfiguratorFormElement}>{selectedItemPrice}</div>
        
        <div className={styles.productConfiguratorFormElement}>
          <button data-testid="addItemToCart" onClick={sendItemToCart}>Add Item To Cart</button>
          <button data-testid="goToCheckout" onClick={goToCheckout}>Go to checkout</button>
        </div>
        { showItemAddedToCartMessage? <div data-testid="item-added" className={styles.productConfiguratorFormElementSuccessMsg}>Item added to the cart</div>: null}
      </form>
    </div>
  );
};

export default ProductConfigurator;