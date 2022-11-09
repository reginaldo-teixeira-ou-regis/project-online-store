export async function getCategories() {
  // Implemente aqui
  const urlGetCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const listCategories = await fetch(urlGetCategories);
  const categoriesJson = await listCategories.json();
  return categoriesJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const urlGetProductQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const productQuery = await fetch(urlGetProductQuery);
  const productQueryResponse = await productQuery.json();
  return productQueryResponse;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
