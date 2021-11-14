window.addEventListener("DOMContentLoaded", () => populateDetail(cartArray));

// toggling navigation menu
const hamburger = document.querySelector(".hamburger");
const close = document.getElementById("close");
let header = document.querySelector("header");
let detail = document.querySelector(".detail");
let small = document.querySelector("small");

let cartArray = [];
// show the nav menu
hamburger.addEventListener("click", () => {
  header.classList.add("show-nav");
});

// hide nav menu
close.addEventListener("click", () => {
  header.classList.remove("show-nav");
});

//images to display
const images = [
  "./images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];
// switching the different hero images
let count = 0;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let heroImg = document.querySelector(".hero-image img");

prev.addEventListener("click", () => {
  if (count <= 0) {
    count = images.length - 1;
    changeImage(count, images);
  } else {
    count -= 1;
    changeImage(count, images);
  }
});

next.addEventListener("click", () => {
  if (count >= images.length - 1) {
    count = 0;
    changeImage(count, images);
  } else {
    count += 1;
    changeImage(count, images);
  }
});

function changeImage(pos, images) {
  heroImg.src = images[pos];
}
// show items in customers cart
const cartImage = document.querySelector(".cart_image");
cartImage.addEventListener("click", () => {
  header.classList.toggle("show_cart_modal");
  const binImages = document.querySelectorAll(".bin");
  if (binImages.length === 0) {
    detail.innerHTML = `
<p>Your cart is empty</p>
`;
    button.style.display = "none";
    small.style.display = "none";
  } else {
    deleteCartItem(binImages);
  }
});
// hide items in customer cart
let button = document.querySelector("button");
button.addEventListener("click", () => {
  header.classList.remove("show_cart_modal");
});
let notice = document.getElementById("notice");
let valH3 = document.querySelector(".val h3");
const val = document.querySelector(".val");

// change the units of item selected
let cartValue = 0;
val.addEventListener("click", (e) => {
  let current = e.target;
  if (current.dataset.id === "minus" && cartValue <= 0) {
    cartValue = 0;
    notice.textContent = "Quantity can not be zero";
  } else if (current.dataset.id === "minus") {
    cartValue -= 1;
    valH3.textContent = cartValue;
  } else if (current.dataset.id === "plus") {
    cartValue += 1;
    valH3.textContent = cartValue;
    notice.style.display = "none";
  }
});

// updating the cart item

// selecting  button to saved items in cart
const btn = document.getElementById("button");
btn.addEventListener("click", () => {
  let itemTitle = document.querySelector(".hero-info h1");
  let unitPrice = document.querySelector(".pricing h1");

  const boughtItem = {
    img: "./images/image-product-1-thumbnail.jpg",
    unitPrice: Number.parseInt(unitPrice.textContent.substring(1)),
    itemName: itemTitle.textContent.substring(0, 15) + "...",
    units: cartValue,
  };
  if (boughtItem.units === 0) {
    cartArray = cartArray;
    notice.style.display = "block";
  } else {
    cartArray.push(boughtItem);
    populateDetail(cartArray);
    cartValue = 0;
    valH3.textContent = cartValue;
    small.textContent = cartArray.length;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
});

function populateDetail(cartArray) {
  if (cartArray.length === 0) {
    detail.innerHTML = `
<p>Your cart is empty</p>
`;
    button.style.display = "none";
    small.style.display = "none";
  } else {
    detail.innerHTML = "";
    button.style.display = "inline-block";
    small.style.display = "block";
    cartArray.forEach((item) => {
      let div = document.createElement("div");
      div.className = "top";
      div.innerHTML = `
                      <img
                        src=${item.img}
                        alt="product"
                      />
                      <div class="item-info">
                        <p class="title">${item.itemName}</p>
                        <p class="price">
                          $${item.unitPrice} x ${item.units}
                          <span>$${item.unitPrice * item.units}</span>
                        </p>
                      </div>
                      <div class="bin" >
                        <img src= "./images/icon-delete.svg" alt="bin-icon">
                      </div>
           

  `;
      detail.appendChild(div);
    });
  }
}
// show light box
let main = document.querySelector("main");
let boxPrev = document.querySelector(".lightbox-arrows .prev");
let boxNext = document.querySelector(".lightbox-arrows .next");
const closeBtn = document.querySelector(".close-box");
const imgBtn = document.querySelector(".thumbnails");
let showCaseImage = document.querySelector(".showcase img");
let boxThumbnails = document.querySelectorAll(".box-thumbnails .img");

// show lightbox
imgBtn.addEventListener("click", (e) => {
  let current = e.target;
  showCaseImage.src = images[Number.parseInt(current.dataset.img)];

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  main.classList.add("show-lightbox");
});
closeBtn.addEventListener("click", () => {
  main.classList.remove("show-lightbox");
});
// let closeBtn = document.

function changeLightBoxImage(pos, img) {
  showCaseImage.src = img[pos];
}
let counter = 0;
boxPrev.addEventListener("click", () => {
  if (counter <= 0) {
    counter = images.length - 1;
    changeLightBoxImage(counter, images);
    styleThumb(counter);
  } else {
    counter -= 1;
    changeLightBoxImage(counter, images);
    styleThumb(counter);
  }
});

boxNext.addEventListener("click", () => {
  if (counter >= images.length - 1) {
    counter = 0;
    changeLightBoxImage(counter, images);
    styleThumb(counter);
  } else {
    counter += 1;
    changeLightBoxImage(counter, images);
    styleThumb(counter);
  }
});

function styleThumb(pos) {
  boxThumbnails.forEach((thumbs) => {
    let attr = thumbs.dataset.id;
    if (attr == pos) {
      thumbs.style.opacity = "0.5";
      thumbs.style.border = "2px solid hsl(26, 100%, 55%)";
    } else {
      thumbs.style.opacity = "1";
      thumbs.style.border = "none";
    }
  });
}

function deleteCartItem(binArray) {
  binArray.forEach((bin, binIndex) => {
    bin.addEventListener("click", (e) => {
      detail.removeChild(e.currentTarget.parentNode);
      cartArray = cartArray.filter((item, itemIndex) => binIndex !== itemIndex);
      small.textContent = cartArray.length;
    });
  });
}
