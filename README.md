# ☁️ Modern Weather App

A sleek, professional weather dashboard featuring a **Dark Glassmorphism UI**. This application provides real-time weather updates, 5-day forecasts, and a "Saved Cities" world map feature, powered by the OpenWeatherMap API.

### 🔗 **Live Demo:** [View Live App](https://weather-app-theta-seven-83.vercel.app/)

## ✨ Features

- **Glassmorphism UI**: A modern, transparent, and responsive design with deep night gradients.
- **Live Weather Data**: Instant access to temperature, humidity, wind speed, visibility, and more.
- **5-Day Forecast**: Scrollable forecast cards to plan your week ahead.
- **Smart Search**: Search for any city globally with error handling and smooth UI transitions.
- **World Map / Saved Cities**: A dedicated section to save and track weather for your favorite cities.
- **Auto-Geolocation**: Automatically detects your location on startup to show local weather.

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3 (Flexbox/Grid, Animations), JavaScript (ES6+ Async/Await).
- **Design Style**: Glassmorphism (Backdrop Filters, Translucency).
- **API**: [OpenWeatherMap API](https://openweathermap.org/) (Current Weather + 5 Day Forecast).
- **Icons**: [FontAwesome](https://fontawesome.com/) & Custom 3D Weather Assets.

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox).
- A free API key from [OpenWeatherMap](https://home.openweathermap.org/api_keys).

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/iamAditya-Pandey/weather-app.git
   ```

2. **Navigate to the project directory:**
   ```sh
   cd weather-app
   ```

3. **Configure your API Key:**
   - Open `js/main.js`.
   - Locate the variable at the top:
     ```javascript
     const API_KEY = "PUT_YOUR_API_KEY_HERE";
     ```
   - Replace the placeholder with your actual key.

4. **Run the App:**
   - Simply open `index.html` in your browser.

## 📂 Project Structure

```
weather-app/
├── css/
│   ├── style.css    # Main dashboard styles
│   ├── search.css   # Search page styles
│   └── world.css    # Saved cities page styles
├── img/             # Weather icons
├── js/
│   ├── main.js      # Logic for index.html
│   ├── search.js    # Logic for search.html
│   └── world.js     # Logic for world.html
├── index.html       # Main Dashboard
├── search.html      # Search Page
└── README.md        # Documentation
```

## 📬 Contact

**Aditya Pandey** - **GitHub**: [@iamAditya-Pandey](https://github.com/iamAditya-Pandey)  
- **Email**: pandeyaditya19012006@gmail.com

---
*Built with ❤️ by Aditya Pandey.*