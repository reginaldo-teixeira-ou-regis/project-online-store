export async function getCategories() {
  const urlGetCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const listCategories = await fetch(urlGetCategories);
  const categoriesJson = await listCategories.json();
  return categoriesJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlGetProductQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const productQuery = await fetch(urlGetProductQuery);
  const productQueryResponse = await productQuery.json();
  return productQueryResponse;
}

export async function getProductById(id) {
  const urlGetItemsDetails = `https://api.mercadolibre.com/items/${id}`;
  const ItemsDetails = await fetch(urlGetItemsDetails);
  const ItemsDetailsResponse = await ItemsDetails.json();
  return ItemsDetailsResponse;
}
