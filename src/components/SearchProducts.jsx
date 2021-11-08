import React, { useContext, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import AppContext from '../context/AppContext';
import { getProductsByCategoryId, getProductsFromCategoryAndQuery } from '../api/mercadoLivre';
import CardProductsList from './CardProductsList';
import { backEndNode, webScrapFlask } from '../api/backEndApi';

function SearchProducts() {
  const { categories, setCategoryName } = useContext(AppContext);
  const [categoryId, setCategoryId] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isBuscape, setIsBuscape] = useState(false);

  const getProductsByCategoryName = async (name) => {
    const categorySelected = Object.values(categories).find((cat) => cat.name === name);
    setCategoryId(categorySelected.id);
    return getProductsByCategoryId(categorySelected.id);
  };

  const handleChangeDropDown = ({ value }) => {
    setCategoryName(value);
    getProductsByCategoryName(value).then((res) => setProductsList(res.results));
  };

  const handleInputChange = ({ target: { value } }) => {
    const lowerCaseValue = value.toLowerCase();
    setSearchInput(lowerCaseValue);
  };

  const handleClickSearch = async () => {
    let products = [];
    if (!isBuscape) {
      products = await getProductsFromCategoryAndQuery(categoryId, searchInput);
      setProductsList(products.results);
    } else {
      products = await webScrapFlask.get(`/${searchInput}`);
      setProductsList(products.data);
    }

    await backEndNode.post('/researches', isBuscape ? products.data : products.results);
  };

  const renderDropDown = () => (
    <Dropdown
      options={categories.length > 0 && Object.values(categories).map((cat) => cat.name)}
      onChange={(e) => handleChangeDropDown(e)}
      placeholder="Buscar por categoria"
    />
  );

  const clickInBuscapeButton = () => {
    setIsBuscape(true);
    setCategoryName(null);
  };

  return (
    <div>
      <ButtonGroup aria-label="Select a choice">
        <Button onClick={() => setIsBuscape(false)} variant="secondary">
          Mercado Livre
        </Button>
        <Button onClick={clickInBuscapeButton} variant="secondary">
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
