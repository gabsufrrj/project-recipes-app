import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';
import firstFetch from '../helpers/firstFetch';

function FilterByCategories({ apiName }) {
  const { setRecipes } = useContext(recipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchRecipesByCategory = async (category) => {
    const url = `https://www.${apiName}.com/api/json/v1/1/filter.php?c=${category}`;
    try {
      const request = await fetch(url);
      const json = await request.json();
      setRecipes(Object.values(json)[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (category) => {
    if (category === selectedCategory || category === 'All') {
      firstFetch(apiName, setRecipes);
      setSelectedCategory('');
    } else {
      fetchRecipesByCategory(category);
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const fetchCatgories = async () => {
      const url = `https://www.${apiName}.com/api/json/v1/1/list.php?c=list`;
      const number5 = 5;
      try {
        const request = await fetch(url);
        const json = await request.json();
        const categoriesObject = Object.values(json)[0].slice(0, number5);
        const categoriesArray = categoriesObject.map((e) => e.strCategory);
        setCategories(categoriesArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCatgories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {(categories.length > 0) && categories.map((e) => (
        <button
          type="button"
          key={ e }
          data-testid={ `${e}-category-filter` }
          value={ e }
          onClick={ () => handleClick(e) }
        >
          { e }
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClick('All') }
      >
        All
      </button>
    </div>
  );
}

export default FilterByCategories;

FilterByCategories.propTypes = {
  apiName: PropTypes.string.isRequired,
};
