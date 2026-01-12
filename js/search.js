const API_KEY = "1e3e8f230b6064d27976e41163a82b77";

// --- IMAGE MAP (Matches main.js for consistency) ---
const weatherImages = {
    "rain": "img/rain.png",
    "drizzle": "img/rain.png",
    "thunderstorm": "img/thunderstorm.png",
    "snow": "img/snow.png",
    "clear": "img/sun.png",
    "clear sky": "img/sun.png",
    "clouds": "img/cloud.png",
    "smoke": "img/cloud.png",
    "mist": "img/mist.png",
    "fog": "img/mist.png",
    "haze": "img/haze.png"
};

// --- SELECTORS ---
const searchInput = document.querySelector(".search input"); // Matches CSS structure
const resultBox = document.querySelector(".box");            // The result card container
const defaultMessage = document.querySelector(".message");   // "Search for a city..."
const errorMessage = document.querySelector(".error-message"); // "City not found"

// --- EVENT LISTENERS ---
// 1. Listen for Enter Key
searchInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        const city = searchInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

// --- MAIN SEARCH FUNCTION ---
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);

        if (response.status === 404) {
            showError();
        } else {
            const data = await response.json();
            updateUI(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        showError();
    }
}

// --- UPDATE UI ELEMENTS ---
function updateUI(data) {
    // 1. Show the Result Box, Hide Messages
    defaultMessage.style.display = "none";
    errorMessage.style.display = "none";
    resultBox.style.display = "flex"; // CSS .box is flex container

    // 2. Update Main Info
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
    
    // 3. Update Weather Image
    const condition = data.weather[0].main.toLowerCase();
    const imgElement = document.querySelector(".weather-icon img");
    // Use the map, default to sun if not found
    imgElement.src = weatherImages[condition] || "img/sun.png";

    // 4. Update Details (Wind, Pressure, Humidity)
    // Using helper check to ensure element exists before setting innerHTML
    setSafeText(".wind", Math.floor(data.wind.speed) + " m/s");
    setSafeText(".pressure", data.main.pressure + " hPa");
    setSafeText(".humidity", Math.floor(data.main.humidity) + "%");

    // 5. Update Sun Times
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
    
    setSafeText(".sunrise", sunrise);
    setSafeText(".sunset", sunset);
}

// --- HELPER: SHOW ERROR ---
function showError() {
    resultBox.style.display = "none";
    defaultMessage.style.display = "none";
    errorMessage.style.display = "block"; // Show the error text
}

// --- HELPER: SAFE TEXT UPDATE ---
function setSafeText(selector, text) {
    const el = document.querySelector(selector);
    if (el) {
        el.innerHTML = text;
    }
}