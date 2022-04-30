async function firstFetch(apiName, setRecipes) {
  const url = `https://www.${apiName}.com/api/json/v1/1/search.php?s=`;
  try {
    const request = await fetch(url);
    const json = await request.json();
    const valuesJson = Object.values(json)[0];
    setRecipes(valuesJson);
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
}

export default firstFetch;
