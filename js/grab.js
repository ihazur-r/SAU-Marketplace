console.log("🔥 GRAB JS LOADED");
const API = "https://sau-marketplace.onrender.com/api";

let products = [];

// ===============================
// LOAD DATA
// ===============================
fetch(`${API}/products`)
.then(res => res.json())
.then(data => {
console.log("Fetched products:", data);

```
products = data;
renderItems(products);
```

})
.catch(err => {
console.log("Error fetching products:", err);
});

// ===============================
// RENDER ITEMS
// ===============================
function renderItems(list) {
const grid = document.getElementById("itemGrid");

if (!grid) return;

grid.innerHTML = "";

if (!list || list.length === 0) {
grid.innerHTML = "<p style='color:white;'>No items found</p>";
return;
}

list.forEach((item) => {
const card = document.createElement("div");
card.classList.add("card");

```
// ✅ FIXED IMAGE HANDLING
let imgSrc;

if (typeof item.images === "string") {
  imgSrc = item.images; // base64 string
} else if (Array.isArray(item.images)) {
  imgSrc = item.images[0];
} else {
  imgSrc = item.image || "https://via.placeholder.com/150";
}

console.log("Image source:", imgSrc); // debug

card.innerHTML = `
  <img src="${imgSrc}" loading="lazy"
    style="width:100%; height:150px; object-fit:cover; border-radius:12px;">

  <h3>${item.title || "No Title"}</h3>
  <p class="price">₹${item.price || "N/A"}</p>

  <p style="color:#ccc;">${item.about || ""}</p>

  <div>
    <span>${item.condition || "N/A"}</span> |
    <span>${item.age || "N/A"}</span>
  </div>

  <p style="color:#aaa;">👤 ${item.seller || "Unknown"}</p>
  <p style="color:#d4af37;">📞 ${item.mobile || "N/A"}</p>
`;

grid.appendChild(card);
```

});
}

// ===============================
// SEARCH
// ===============================
function searchItems() {
const value = document.getElementById("searchInput").value.toLowerCase();

const filtered = products.filter(item =>
(item.title || "").toLowerCase().includes(value)
);

renderItems(filtered);
}

// ===============================
// AGE CONVERTER
// ===============================
function getAgeValue(age) {
if (!age) return 999;

if (age.includes("Less than")) return 1;
if (age.includes("1-3")) return 2;
if (age.includes("3-6")) return 3;
if (age.includes("6-12")) return 4;
if (age.includes("1+")) return 5;

return 999;
}

// ===============================
// SORT
// ===============================
function sortItems() {
const value = document.getElementById("sortSelect").value;

let sorted = [...products];

if (value === "priceLow") {
sorted.sort((a, b) => Number(a.price) - Number(b.price));
}

else if (value === "priceHigh") {
sorted.sort((a, b) => Number(b.price) - Number(a.price));
}

else if (value === "ageNew") {
sorted.sort((a, b) => getAgeValue(a.age) - getAgeValue(b.age));
}

else if (value === "ageOld") {
sorted.sort((a, b) => getAgeValue(b.age) - getAgeValue(a.age));
}

products = sorted;
renderItems(products);
}
