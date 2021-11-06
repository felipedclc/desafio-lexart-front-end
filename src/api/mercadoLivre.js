export default async function getCategories() {
  return fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((res) => res.json())
    .catch((e) => e.message);
}

export async function getProductsByCategoryId(categoryId) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`)
    .then((res) => res.json())
    .catch((e) => e.message);
}

export async function getProductsByName(name) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${name}`)
    .then((res) => res.json())
    .catch((e) => e.message);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (!query) {
    return getProductsByCategoryId(categoryId)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  return fetch(endPoint)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
