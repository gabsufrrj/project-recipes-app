// Fetch utilizado para carregar inicialmente as Receitas nas telas principais (Food e Drink)
async function firstFetch(apiName, setRecipes, setIsFetching) {
  const url = `https://www.${apiName}.com/api/json/v1/1/search.php?s=`;
  try {
    setIsFetching(true);
    const request = await fetch(url);
    const json = await request.json();
    const valuesJson = Object.values(json)[0];
    setRecipes(valuesJson);
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  setIsFetching(false);
}

export default firstFetch;
