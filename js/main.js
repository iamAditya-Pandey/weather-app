// --- CONFIGURATION ---
const API_KEY = "1e3e8f230b6064d27976e41163a82b77"; // Your specific key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// --- IMAGE MAPPING (Cleaner than if/else chains) ---
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
    "haze": "img/haze.png",
    "dust": "img/mist.png"
};

// --- MAIN FUNCTION: GET USER LOCATION ---
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchLocalWeather(lat, lon);
            },
            () => {
                alert("Please allow location access to see local weather.");
                // Optional: Load a default city like 'London' if denied
                fetchCityWeather("New Delhi");
            }
        );
    }
});

// --- FETCH DATA BY COORDINATES ---
async function fetchLocalWeather(lat, lon) {
    try {
        // 1. Get City Name via Reverse Geocoding
        const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
        const geoData = await geoResponse.json();
        
        if (geoData.length > 0) {
            const cityName = geoData[0].name;
            fetchCityWeather(cityName);
        }
    } catch (error) {
        console.error("Location Error:", error);
    }
}

// --- FETCH WEATHER BY CITY NAME ---
async function fetchCityWeather(city) {
    try {
        // 2. Get Current Weather & Forecast
        const url = `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "200") {
            updateCurrentWeather(data);
            updateForecast(data);
        } else {
            console.error("City not found");
        }
    } catch (error) {
        console.error("API Error:", error);
    }
}

// --- UI UPDATE: CURRENT WEATHER ---
function updateCurrentWeather(data) {
    const current = data.list[0]; // Current time slot
    const condition = current.weather[0].main.toLowerCase();
    const description = current.weather[0].description;

    // Update Text Elements
    document.getElementById("city-name").innerText = data.city.name;
    document.getElementById("metric").innerText = Math.floor(current.main.temp) + "°";
    document.getElementById("weather-main").innerText = description;
    document.getElementById("humidity").innerText = current.main.humidity;
    document.getElementById("feels-like").innerText = Math.floor(current.main.feels_like);
    
    // Update Range
    document.getElementById("temp-min-today").innerText = Math.floor(current.main.temp_min) + "°";
    document.getElementById("temp-max-today").innerText = Math.floor(current.main.temp_max) + "°";

    // Update Image (using the cleaner Map object)
    const imgElement = document.querySelector(".weather-icon");
    // Default to sun if condition not found in map
    const imgSrc = weatherImages[condition] || "img/sun.png";
    imgElement.src = imgSrc;
}

// --- UI UPDATE: 5-DAY FORECAST ---
function updateForecast(data) {
    const forecastContainer = document.getElementById("future-forecast-box");
    forecastContainer.innerHTML = ""; // Clear previous data
    
    // Filter to get roughly one forecast per day (OpenWeather gives every 3 hours)
    // We use an object to store the first entry found for each unique date
    const dailyForecasts = {};

    data.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0]; // Extract YYYY-MM-DD
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item; // Save the first reading of the day
        }
    });

    // Generate HTML
    // We limit to 5 days to prevent overflow
    const days = Object.values(dailyForecasts).slice(1, 7); 

    days.forEach((day) => {
        const dateObj = new Date(day.dt_txt);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue...
        const temp = Math.floor(day.main.temp) + "°";
        const condition = day.weather[0].main.toLowerCase();
        const desc = day.weather[0].description;
        
        const imgSrc = weatherImages[condition] || "img/sun.png";

        const cardHTML = `
            <div class="weather-forecast-box">
                <div class="day-weather">${dayName}</div>
                <div class="weather-icon-forecast">
                    <img src="${imgSrc}" alt="${condition}" />
                </div>
                <div class="temp-weather">${temp}</div>
                <div class="weather-main-forecast">${desc}</div>
            </div>
        `;

        forecastContainer.innerHTML += cardHTML;
    });
}