const addToCartButtons = document.querySelectorAll(".add-to-cart");
const list = document.getElementById("list");
const cart = document.getElementById("cart");
const cartItemsList = document.getElementById("cart-items");
const total = document.getElementById("total");
let cartItems = [];

document.addEventListener("DOMContentLoaded", () => {
  const storedCartItems = localStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    updateCart();
  }
});

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart")) {
    const price = parseFloat(event.target.getAttribute("data-price"));
    const imageSrc = event.target.getAttribute("data-image");
    const title = event.target.getAttribute("data-title");
    const existingItem = cartItems.find((item) => item.title === title);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ price, imageSrc, title, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCart();
  }
});

function updateCart() {
  cartItemsList.innerHTML = "";
  let cartTotal = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    const image = document.createElement("img");
    const title = document.createElement("h4");
    const price = document.createElement("span");
    const quantity = document.createElement("span");
    const incrementButton = document.createElement("button");
    const decrementButton = document.createElement("button");
    const deleteButton = document.createElement("div");

    const div = document.createElement("div");

    image.src = item.imageSrc;
    image.alt = item.title;
    title.textContent = item.title;
    price.textContent = `${item.price.toFixed(2)} KR.`;
    quantity.textContent = item.quantity;
    incrementButton.textContent = "+";
    decrementButton.textContent = "-";

    incrementButton.addEventListener("click", () => {
      item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
    });

    decrementButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        const index = cartItems.indexOf(item);
        if (index !== -1) {
          cartItems.splice(index, 1);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCart();
    });

    deleteButton.addEventListener("click", () => {
      const index = cartItems.indexOf(item);
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCart();
      }
    });

    li.appendChild(image);
    li.appendChild(title);
    li.appendChild(price);
    li.appendChild(div);
    div.appendChild(decrementButton);
    div.appendChild(quantity);
    div.appendChild(incrementButton);
    li.appendChild(deleteButton);

    cartItemsList.appendChild(li);

    image.classList = "rounded w-[74px] row-span-3";
    li.classList =
      "grid h-[74px] grid-rows-3 grid-cols-3 grid-flow-col gap-4";
    price.classList = "col-span-2";
    title.classList = "col-span-2";
    div.classList = "col-span-1 flex items-center";
    incrementButton.classList = "p-1";
    quantity.classList = "p-1";
    decrementButton.classList = "p-1";
    deleteButton.classList =
      "hover:scale-110 cursor-pointer col-start-4 button-delete justify-self-end";

    const itemTotal = item.price * item.quantity;
    cartTotal += itemTotal;
  });

  total.textContent = cartTotal.toFixed(2);
}