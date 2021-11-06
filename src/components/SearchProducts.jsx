import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import getCategories, { getProductsByCategoryId, getProductsFromCategoryAndQuery } from '../api/mercadoLivre';
import CardProductsList from './CardProductsList';
import backEndApi, { webScrapPython } from '../api/backEndApi';

function SearchProducts() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isBuscape, setIsBuscape] = useState(false);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  const getProductsByCategoryName = async (name) => {
    const categorySelected = Object.values(categories).find((cat) => cat.name === name);
    setCategoryId(categorySelected.id);
    return getProductsByCategoryId(categorySelected.id);
  };

  const handleChangeDropDown = (e) => {
    const catName = e.value;
    getProductsByCategoryName(catName).then((res) => setProductsList(res.results));
  };

  const handleInputChange = ({ target: { value } }) => {
    const lowerCaseValue = value.toLowerCase();
    const filterProd = productsList
      .filter(({ title }) => title.toLowerCase().includes(lowerCaseValue));
    setSearchInput(value);
    setProductsList(filterProd);
  };

  const handleClickSearch = async () => {
    let products = [];
    if (!isBuscape) {
      products = await getProductsFromCategoryAndQuery(categoryId, searchInput);
      setProductsList(products.results);
    } else {
      products = await webScrapPython(searchInput);
      setProductsList(products);
    }

    await backEndApi.post('/researches', isBuscape ? products : products.results);
  };

  const renderDropDown = () => (
    <Dropdown
      options={categories.length > 0 && Object.values(categories).map((cat) => cat.name)}
      onChange={(e) => handleChangeDropDown(e)}
      placeholder="Buscar por categoria"
    />
  );

  return (
    <div>
      <ButtonGroup aria-label="Select a choice">
        <Button onClick={() => setIsBuscape(false)} variant="secondary">
          Mercado Livre
        </Button>
        <Button onClick={() => setIsBuscape(true)} variant="secondary">
          Buscapé
        </Button>
      </ButtonGroup>
      <InputGroup className="mb-3">
        <FormControl
          onChange={(e) => handleInputChange(e)}
          placeholder="Buscar produtos"
          aria-label="Buscar produtos"
          aria-describedby="basic-addon1"
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={handleClickSearch}
        >
          Buscar
        </Button>
      </InputGroup>
      {!isBuscape && renderDropDown()}
      <CardProductsList
        listProducts={productsList}
        site={isBuscape ? 'Buscapé' : 'Mercado Livre'}
      />
    </div>
  );
}

export default SearchProducts;
