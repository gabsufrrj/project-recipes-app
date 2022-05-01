import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../Context/MyContext';
import fetchCatgories from '../helpers/fetchCategories';

function FilterByCategories({ apiName }) {
  const { categories, setCategories } = useContext(recipesContext);

  // const [selectedCategory, setSelectedCategory] = useState(undefined);

  useEffect(() => {
    fetchCatgories(apiName, setCategories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {(categories.length > 0) && categories.map((e) => (
        <label key={ e } htmlFor={ e }>
          <input
            data-testid={ `${e}-category-filter` }
            type="radio"
            id={ e }
            name="category"
            value={ e }
          />
          { e }
        </label>
      ))}
    </div>
  );
}

export default FilterByCategories;

FilterByCategories.propTypes = {
  apiName: PropTypes.string.isRequired,
};
