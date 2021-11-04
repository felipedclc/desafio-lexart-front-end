import PropTypes from 'prop-types';
import React from 'react';
import CardProducts from './CardProducts';

function CardProductsList({ listProducts, site }) {
  return (
    <ul>
      {listProducts && listProducts.map((prod) => (
        <li key={prod.id}>
          <CardProducts
            thumbnail={prod.thumbnail}
            title={prod.title}
            category={prod.category_id}
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
