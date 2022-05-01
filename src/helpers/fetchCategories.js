async function fetchCatgories(apiName, setCategories) {
  const url = `https://www.${apiName}.com/api/json/v1/1/list.php?c=list`;
  const number5 = 5;
  try {
    const request = await fetch(url);
    const json = await request.json();
    const categoriesObject = Object.values(json)[0].slice(0, number5);
    const categories = categoriesObject.map((e) => e.strCategory);
    setCategories(categories);
  } catch (error) {
    console.log(error);
  }
}

export default fetchCatgories;
