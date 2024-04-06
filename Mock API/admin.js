function search() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();

  fetch("https://661004780640280f219c1a67.mockapi.io/api/travel/data")
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.getElementById("cards-container");
      cardsContainer.innerHTML = ""; // Clear previous search results

      data.forEach((item) => {
        // Search in specific fields: name, description, tags
        if (
          item.name.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.tags.toLowerCase().includes(searchText)
        ) {
          const card = document.createElement("div");
          card.classList.add("card");
          const image = document.createElement("img");
          image.src = item.image;
          card.appendChild(image);

          const name = document.createElement("h3");
          name.textContent = item.name;
          card.appendChild(name);

          const description = document.createElement("p");
          description.textContent = item.description;
          card.appendChild(description);

          const rating = document.createElement("p");
          rating.textContent = "Rating: " + item.rating;
          card.appendChild(rating);

          const cost = document.createElement("p");
          cost.textContent = "Cost: " + item.cost;
          card.appendChild(cost);

          const tags = document.createElement("p");
          tags.textContent = "Tags: " + item.tags;
          card.appendChild(tags);

          const id = document.createElement("p");
          id.textContent = "ID: " + item.id;
          card.appendChild(id);
          cardsContainer.appendChild(card);
        }
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}
document.getElementById("show-add-form").onclick = function() {
  document.getElementById("myModal").style.display = "block";
}

document.getElementsByClassName("close")[0].onclick = function() {
  document.getElementById("myModal").style.display = "none";
}

// Prevent the form from submitting when you press enter
document.getElementById("addForm").onsubmit = function(e) {
  e.preventDefault();
  addNewItem();
};

function addNewItem() {
  const newItem = {
    name: document.getElementById("itemName").value,
    description: document.getElementById("itemDescription").value,
    image: document.getElementById("itemImage").value,
    rating: document.getElementById("itemRating").value,
    cost: document.getElementById("itemCost").value,
    tags: document.getElementById("itemTags").value,
  };

  fetch("https://661004780640280f219c1a67.mockapi.io/api/travel/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    document.getElementById("myModal").style.display = "none";
    addCardToUI(data); // Assuming you have a function to add a card
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function addCardToUI(item) {
  const cardsContainer = document.getElementById("cards-container");

  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = item.image;
  card.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = item.name;
  card.appendChild(name);

  const description = document.createElement("p");
  description.textContent = item.description;
  card.appendChild(description);

  const rating = document.createElement("p");
  rating.textContent = "Rating: " + item.rating;
  card.appendChild(rating);

  const cost = document.createElement("p");
  cost.textContent = "Cost: " + item.cost;
  card.appendChild(cost);

  const tags = document.createElement("p");
  tags.textContent = "Tags: " + item.tags.join(", "); // Assuming tags are an array
  card.appendChild(tags);

  // No need to display the ID in the UI, but if you need it for something else, here's how you could
  const id = document.createElement("p");
  id.textContent = "ID: " + item.id;
  id.style.display = "none"; // Hide the ID from the UI
  card.appendChild(id);

  cardsContainer.appendChild(card);
}
function deleteItem(itemId, cardElement) {
  fetch(`https://661004780640280f219c1a67.mockapi.io/api/travel/data/${itemId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(() => {
    console.log('Deleted:', itemId);
    cardElement.remove(); // Xóa card khỏi UI
  })
  .catch(error => console.error('Error:', error));
}
function showEditForm(item) {
  // Giả sử bạn đã tạo sẵn một form trong HTML với id là 'editForm'
  const form = document.getElementById('editForm');
  form.style.display = 'block'; // Hiển thị form

  // Điền thông tin hiện tại vào form
  document.getElementById('editName').value = item.name;
  document.getElementById('editDescription').value = item.description;
  // ... điền các trường khác tương tự

  // Lưu ID của item vào form để sử dụng khi submit
  form.dataset.id = item.id;
}
document.getElementById('editForm').onsubmit = function(e) {
  e.preventDefault(); // Ngăn chặn form submit theo cách thông thường

  // Lấy ID của item được lưu trước đó
  const itemId = this.dataset.id;

  // Tạo đối tượng với thông tin mới từ form
  const updatedItem = {
    name: document.getElementById('editName').value,
    description: document.getElementById('editDescription').value,
    // ... lấy các trường khác tương tự
  };

  // Gửi request cập nhật lên API
  fetch(`https://661004780640280f219c1a67.mockapi.io/api/travel/data/${itemId}`, {
    method: 'PUT', // Sử dụng phương thức PUT để cập nhật
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItem),
  })
  .then(response => response.json())
  .then(updatedItem => {
    console.log('Updated item:', updatedItem);
    // Cập nhật UI tại đây hoặc tải lại dữ liệu
    document.getElementById('editForm').style.display = 'none'; // Ẩn form sau khi cập nhật
  })
  .catch(error => console.error('Error:', error));
};
function showEditForm(item) {
  document.getElementById("editId").value = item.id;
  document.getElementById("editName").value = item.name;
  document.getElementById("editDescription").value = item.description;
  document.getElementById("editRating").value = item.rating;
  document.getElementById("editCost").value = item.cost;
  document.getElementById("editTags").value = item.tags;
  document.getElementById("editImage").value = item.image;
  editModal.style.display = "block";
}
// JavaScript để mở và đóng modal
const editModal = document.getElementById("editModal");
const closeModal = document.querySelector("#editModal .close");

closeModal.onclick = function() {
  editModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == editModal) {
    editModal.style.display = "none";
  }
}


document.getElementById("editForm").onsubmit = function(event) {
  event.preventDefault();
  const itemId = document.getElementById("editId").value;

  const updatedItem = {
    name: document.getElementById("editName").value,
    description: document.getElementById("editDescription").value,
    rating: document.getElementById("editRating").value,
    cost: document.getElementById("editCost").value,
    tags: document.getElementById("editTags").value,
    image: document.getElementById("editImage").value
  };

  fetch(`https://661004780640280f219c1a67.mockapi.io/api/travel/data/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  })
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
    editModal.style.display = "none";
    // Cập nhật UI hoặc tải lại dữ liệu
  })
  .catch((error) => console.error("Error:", error));
};
// JavaScript để mở và đóng modal chi tiết
const detailModal = document.getElementById("detailModal");
const closeDetailModal = document.querySelector("#detailModal .close");

closeDetailModal.onclick = function() {
  detailModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == detailModal) {
    detailModal.style.display = "none";
  }
}

// Hàm để hiển thị thông tin chi tiết sản phẩm và mở modal
function showProductDetails(item) {
  const productDetails = document.getElementById("productDetails");
  productDetails.innerHTML = `
    <h2>${item.name}</h2>
    <p><strong>Mô Tả:</strong> ${item.description}</p>
    <p><strong>Rating:</strong> ${item.rating}</p>
    <p><strong>Cost:</strong> ${item.cost}</p>
    <p><strong>Tags:</strong> ${item.tags}</p>
    <img src="${item.image}" alt="${item.name}" style="max-width: 100%;">
  `;
  detailModal.style.display = "block";
}

