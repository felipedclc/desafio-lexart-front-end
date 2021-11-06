import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import CardProducts from './CardProducts';

function CardProductsList({ listProducts, site }) {
  const { categoryName } = useContext(AppContext);

  return (
    <ul>
      {listProducts && listProducts.map((prod) => (
        <li key={prod.permalink}>
          <CardProducts
            thumbnail={prod.thumbnail}
            title={prod.title}
            category={categoryName !== null ? categoryName : prod.category_id}
            price={prod.price}
            site={site}
            link={prod.permalink}
          />
        </li>
      ))}
    </ul>
  );
}

CardProductsList.propTypes = {
  listProducts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  site: PropTypes.string.isRequired,
};

export default CardProductsList;
