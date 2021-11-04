import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import getCategories, { getProductsByCategoryId, getProductsByName } from '../api/mercadoLivre';
import CardProductsList from './CardProductsList';
import backEndApi from '../api/backEndApi';

function SearchProducts() {
  const [categories, setCategories] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  const getProductsByCategoryName = async (name) => {
    const categorySelected = Object.values(categories).find((cat) => cat.name === name);
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
    const products = await getProductsByName(searchInput);
    setProductsList(products.results);

    await backEndApi.post('/researches', products.results)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div>
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
      <Dropdown
        options={categories.length > 0 && Object.values(categories).map((cat) => cat.name)}
        onChange={(e) => handleChangeDropDown(e)}
        placeholder="Buscar por categoria"
      />
      <CardProductsList listProducts={productsList} site="Mercado Livre" />
    </div>
  );
}

export default SearchProducts;
