export default async function getProducts(products) {
  const url = `https://www.buscape.com.br/search?q=${products}`;
  return fetch(url).then((res) => res.json()).catch((e) => e.message);
}
