import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getCategories from '../api/mercadoLivre';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  const context = {
    categories,
    setCategories,
    categoryName,
    setCategoryName,
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
