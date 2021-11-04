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
