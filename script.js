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

// --- Добавьте этот код в ваш файл script.js ---
// --- Лучше всего после инициализации карты (L.map(...)) и добавления маркера ---

// 1. Имя вашего файла GeoJSON с границами
const adminBoundsUrl = 'kaz_admbnda_adm2_2024.geojson'; // Имя вашего файла

// 2. Стиль для отображения границ районов
const adminBoundsStyle = {
    color: "#800080", // Фиолетовый цвет линий
    weight: 2,        // Толщина линии
    opacity: 0.7,     // Прозрачность линии
    fillOpacity: 0.05 // Очень легкая заливка, чтобы видеть карту под ней
};

// 3. Функция для добавления всплывающих окон (показывает свойства объекта)
//    Предполагаем, что в файле есть свойства типа ADM2_EN, ADM2_RU, ADM1_EN и т.д.
function onEachAdminFeature(feature, layer) {
    if (feature.properties) {
        let popupContent = '<h4>Информация о районе:</h4><ul>';
        // Попробуем отобразить стандартные названия полей из таких файлов
        if (feature.properties.ADM2_RU) { // Название района на русском
             popupContent += `<li><b>Район:</b> ${feature.properties.ADM2_RU}</li>`;
        } else if (feature.properties.ADM2_EN) { // Название района на английском
             popupContent += `<li><b>District:</b> ${feature.properties.ADM2_EN}</li>`;
        }
         if (feature.properties.ADM1_RU) { // Название области на русском
             popupContent += `<li><b>Область:</b> ${feature.properties.ADM1_RU}</li>`;
        } else if (feature.properties.ADM1_EN) { // Название области на английском
             popupContent += `<li><b>Region:</b> ${feature.properties.ADM1_EN}</li>`;
        }
        // Можно добавить другие свойства, если знаете их имена в файле
        // for (const key in feature.properties) {
        //     if (feature.properties.hasOwnProperty(key)) {
        //         popupContent += `<li><b>${key}:</b> ${feature.properties[key]}</li>`;
        //     }
        // }
        popupContent += '</ul>';
        layer.bindPopup(popupContent);
    }
}

// 4. Загружаем и добавляем GeoJSON слой с границами на карту
fetch(adminBoundsUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка сети при загрузке ${adminBoundsUrl}: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        L.geoJSON(data, {
            style: adminBoundsStyle,
            onEachFeature: onEachAdminFeature // Добавляем всплывающие окна
        }).addTo(map); // Добавляем слой на карту

        console.log(`GeoJSON файл ${adminBoundsUrl} успешно загружен.`);

        // Опционально: центрировать карту на границах (может быть вся страна)
        // const bounds = L.geoJSON(data).getBounds();
        // if (bounds.isValid()) {
        //     map.fitBounds(bounds);
        // }

    })
    .catch(error => {
        console.error(`Не удалось загрузить или обработать ${adminBoundsUrl}:`, error);
        alert(`Не удалось загрузить административные границы из файла ${adminBoundsUrl}. Проверьте консоль.`);
    });

// --- Конец кода для добавления GeoJSON ---
