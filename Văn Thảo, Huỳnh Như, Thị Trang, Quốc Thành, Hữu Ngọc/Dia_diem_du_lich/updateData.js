// File: updateData.js

// Lấy dữ liệu từ tham số truyền vào
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const jsonData = urlParams.get('data');

// Kiểm tra dữ liệu
if (jsonData) {
  const newDestinations = JSON.parse(decodeURIComponent(jsonData));
  // Ghi đè dữ liệu mới vào biến destinations trong data.js
  destinations = newDestinations;
}
