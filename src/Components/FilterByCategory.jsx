import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';
import firstFetch from '../helpers/firstFetch';

function FilterByCategories({ apiName }) {
  const { setRecipes, setIsFetching, isFetching } = useContext(recipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchRecipesByCategory = async (category) => {
    const url = `https://www.${apiName}.com/api/json/v1/1/filter.php?c=${category}`;
    try {
      setIsFetching(true);
      const request = await fetch(url);
      const json = await request.json();
      setRecipes(Object.values(json)[0]);
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false);
  };

  const handleClick = (category) => {
    if (category === selectedCategory || category === 'All') {
      setSelectedCategory('');
      firstFetch(apiName, setRecipes, setIsFetching);
    } else {
      setSelectedCategory(category);
      fetchRecipesByCategory(category);
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
      {(categories.length > 0) && (
        <>
          {categories.map((e) => (
            <button
              type="button"
              key={ e }
              data-testid={ `${e}-category-filter` }
              value={ e }
              onClick={ () => handleClick(e) }
              disabled={ isFetching }
            >
              { e }
            </button>))}
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => handleClick('All') }
            disabled={ isFetching }
          >
            All
          </button>
        </>
      )}
    </div>
  );
}

export default FilterByCategories;

FilterByCategories.propTypes = {
  apiName: PropTypes.string.isRequired,
};
