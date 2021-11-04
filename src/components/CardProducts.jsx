import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function CardProducts({
  thumbnail, title, category, price, site, link,
}) {
  return (
    <CardGroup>
      <a target="_blank" href={link} rel="noreferrer">
        <Card.Body border="primary">
          <Card.Img variant="top" src={thumbnail} alt={`imagem ${title}`} style={{ width: '100px' }} />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{category}</Card.Text>
          <Card.Text className="price">{`R$ ${price}`}</Card.Text>
          <Card.Text>{site}</Card.Text>
        </Card.Body>
      </a>
    </CardGroup>
  );
}

CardProducts.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  site: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CardProducts;
