// ===============================
// IMAGE HANDLING
// ===============================
let selectedImages = [null, null, null];

function handleImage(input, index) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    selectedImages[index] = e.target.result;
  };

  reader.readAsDataURL(file);
}


// ===============================
// ADD PRODUCT
// ===============================
async function addProduct() {
  console.log("Button clicked");

  const title = document.getElementById("itemName").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value;
  const condition = document.getElementById("condition").value;
  const age = document.getElementById("age").value;
  const about = document.getElementById("description").value.trim();

  if (!title || !price || !category) {
    alert("Fill required fields");
    return;
  }

  const images = selectedImages.filter(img => img !== null);

  const newItem = {
    title,
    price: Number(price),
    category,
    condition,
    age,
    description: about,
    images
  };

  try {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    });

    const data = await res.json();
    console.log("Saved:", data);

    alert("Item added successfully! ✅");

    window.location.href = "grab.html";

  } catch (err) {
    console.error(err);
    alert("Error saving product ❌");
  }
}
