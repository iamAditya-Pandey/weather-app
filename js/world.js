const API_KEY = "1e3e8f230b6064d27976e41163a82b77";

// --- IMAGE MAP ---
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
const container = document.querySelector(".box");
const searchInput = document.querySelector(".search input");
const addSection = document.querySelector(".add-section");
const navBtn = document.querySelector(".button");
const navIcon = document.querySelector(".button i"); // Select the icon inside the button

// Messages inside the popup
const normalMsg = document.querySelector(".normal-message");
const errorMsg = document.querySelector(".error-message");
const addedMsg = document.querySelector(".added-message");

// --- 1. SET DATE ---
const dateElement = document.querySelector(".date");
const now = new Date();
const options = { month: 'long', day: 'numeric', year: 'numeric' };
dateElement.innerHTML = now.toLocaleDateString("en-US", options); 
// ^ This replaces the long array of month names automatically!

// --- 2. INITIAL CITIES ---
const defaultCities = ["London", "Paris", "New York", "Tokyo", "Mumbai"];

// Load defaults on startup
window.addEventListener('load', () => {
    defaultCities.forEach(city => fetchCity(city));
});

// --- 3. FETCH FUNCTION ---
async function fetchCity(cityName) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            createCard(data);
            return true; // Success
        } else {
            return false; // Failed
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

// --- 4. CREATE CARD HTML ---
function createCard(data) {
    const condition = data.weather[0].main.toLowerCase();
    const imgSrc = weatherImages[condition] || "img/sun.png";
    
    // Create the HTML String
    const cardHTML = `
        <div class="weather-box">
            <div class="name">
                <div class="city-name">${data.name}</div>
                <div class="weather-temp">${Math.floor(data.main.temp)}°</div>
            </div>
            <div class="weather-icon">
                <img src="${imgSrc}" alt="${condition}">
            </div>
        </div>
    `;

    // Add to the container (at the top)
    container.insertAdjacentHTML('afterbegin', cardHTML);
}

// --- 5. TOGGLE MODAL (Add City Popup) ---
navBtn.addEventListener("click", () => {
    addSection.classList.toggle("active");
    
    // Toggle Icon (Plus <-> X)
    if (addSection.classList.contains("active")) {
        navIcon.className = "fa-solid fa-circle-xmark";
    } else {
        navIcon.className = "fa-solid fa-circle-plus";
        // Reset messages when closing
        resetMessages();
    }
});

// --- 6. HANDLE SEARCH (Inside Popup) ---
searchInput.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
        const city = searchInput.value.trim();
        
        if (city) {
            const success = await fetchCity(city);
            
            // Show appropriate message
            if (success) {
                normalMsg.style.display = "none";
                errorMsg.style.display = "none";
                addedMsg.style.display = "block";
                
                // Clear input
                searchInput.value = "";
                
                // Optional: Close modal after 1 second
                setTimeout(() => {
                    addSection.classList.remove("active");
                    navIcon.className = "fa-solid fa-circle-plus";
                    resetMessages();
                }, 1500);
            } else {
                normalMsg.style.display = "none";
                addedMsg.style.display = "none";
                errorMsg.style.display = "block";
            }
        }
    }
});

function resetMessages() {
    normalMsg.style.display = "block";
    errorMsg.style.display = "none";
    addedMsg.style.display = "none";
}