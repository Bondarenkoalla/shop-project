const base_url = 'https://voodoo-sandbox.myshopify.com/products.json?'
import item from '../templates/item.hbs';
const pagination = document.getElementById('pagination');
const list = document.getElementById('list');

const urlParams = new URLSearchParams(window.location.search);

const currentPage = parseInt(urlParams.get('page')) || 1;
async function fetchProducts() {
  const paginationLinks = generatePaginationLinks(15, currentPage);
  pagination.innerHTML = paginationLinks;
  try {
    const response = await fetch(`${base_url}&page=${currentPage}`);
    const products = await response.json();
    return products;
  }

  catch (error) {
    console.error(error)
  }
}

async function renderProducts() {
  const products = await fetchProducts();
  list.innerHTML = item(products)
}


renderProducts()

function generatePaginationLinks(page, currentPage) {
  const paginationHTML = [];

  const minPage = Math.max(1, currentPage - 2);
  const maxPage = Math.min(page, currentPage + 2);

  if (minPage > 1) {
    paginationHTML.push(`<a href="?page=${1}" class="rounded-full border w-9 h-9 border-dark flex items-center justify-center">1</a>`);
    if (minPage > 2) {
      paginationHTML.push(`<a href="?page=${minPage - 1}" class="rounded-full border w-9 h-9 border-dark flex items-center justify-center">...</a>`);
    }
  }

  for (let i = minPage; i <= maxPage; i++) {
    if (i === currentPage) {
      paginationHTML.push(`<a href="?page=${i}" class="bg-dark text-white rounded-full border w-9 h-9 border-dark flex items-center justify-center">${i}</a>`);
    } else {
      paginationHTML.push(`<a href="?page=${i}" class=" rounded-full border w-9 h-9 border-dark flex items-center justify-center">${i}</a>`);
    }
  }

  if (maxPage < page) {
    if (maxPage < page - 1) {
      paginationHTML.push(`<a href="?page=${maxPage + 1}" class="rounded-full border w-9 h-9 border-dark flex items-center justify-center">...</a>`);
    }
    paginationHTML.push(`<a href="?page=${page}" class="rounded-full border w-9 h-9 border-dark flex items-center justify-center">${page}</a>`);
  }

  return paginationHTML.join("");
}