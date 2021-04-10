import React from 'react';
import { theme } from '../../theme';
import styles from './Book.module.css';

interface BookProps{
  color: string;
}

// Functional comonent that changes background color based on the selected cover color
const Book = ({ color }: BookProps) => {

  // Returns the hsl color combination to be used as background color for the book
  const getHslColor = (color: String) => {
    if (color === 'blue') {
      return `hsl(${theme.colour.cool.hue}, ${theme.colour.cool.sat}%, ${theme.colour.cool.light}%)`;
    } else if (color === 'red') {
      return `hsl(${theme.colour.hot.hue}, ${theme.colour.hot.sat}%, ${theme.colour.hot.light}%)`;
    } else {
      return `hsl(${theme.colour.brand.hue}, ${theme.colour.brand.sat}%, ${theme.colour.brand.light}%)`;
    }
  };
  
  return (
    <div data-testid="book" className={styles.book} style={{ backgroundColor: `${getHslColor(color)}` }}>
    </div>
  );
};

export default Book;