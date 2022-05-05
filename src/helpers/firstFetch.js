// Fetch utilizado para carregar inicialmente as Receitas nas telas principais (Food e Drink)
async function firstFetch(apiName, setRecipes, selectedIngredient) {
  try {
    if (selectedIngredient) {
      const URL = `https://www.${apiName}.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
      const request = await fetch(URL);
      const json = await request.json();
      const valuesJson = Object.values(json);
      console.log(valuesJson[0]);
      setRecipes(valuesJson[0]);
    } else {
      const url = `https://www.${apiName}.com/api/json/v1/1/search.php?s=`;
      const request = await fetch(url);
      const json = await request.json();
      const valuesJson = Object.values(json)[0];
      setRecipes(valuesJson);
    }
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
}

export default firstFetch;
