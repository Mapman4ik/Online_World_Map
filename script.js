// File: script.js

// Define the base tile layers first
const osmEn = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors' // Corrected typo
});

const osmRu = L.tileLayer('https://tile.openstreetmap.ru/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://openstreetmap.ru">OpenStreetMap.ru</a>'
});

// Initialize the map only once
// Use the desired initial layer (osmRu) in the initialization options
const map = L.map('map', {
  center: [43.222, 76.851],
  zoom: 13,
  layers: [osmRu] // Set initial layer to Russian OSM
});

// Add the marker to the single map instance
L.marker([43.222, 76.851]).addTo(map).bindPopup('Алматы - Центр города').openPopup();

// Define the base maps object for the layer control
const baseMaps = {
  "OSM (русский)": osmRu,
  "OSM (английский)": osmEn
};

// Add the layer control to the map
L.control.layers(baseMaps).addTo(map);
