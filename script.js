 async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      const apiKey = "4eb3703790b356562054106543b748b2";
      const weatherBox = document.getElementById("weatherResult");
      if (!city) {
        weatherBox.innerHTML = `<h2>Weather Details</h2><p style='color:red;'>Please enter a city name.</p>`;
        return;
      }
      weatherBox.innerHTML = `<h2>Weather Details</h2><p>Loading...</p>`;
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        weatherBox.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><img class='weather-icon' src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon"> ${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp}&deg;C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind: ${data.wind.speed} m/s</p>
        `;
      } catch (err) {
        weatherBox.innerHTML = `<h2>Weather Details</h2><p style='color:red;'>${err.message}</p>`;
      }
    }

    async function fetchUsers() {
      const list = document.querySelector(".user-list");
      list.innerHTML = "<li>Loading users...</li>";
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await res.json();
        list.innerHTML = users.map(user => `
          <li><strong>${user.name}</strong><span>${user.email} - ${user.address.city}</span></li>
        `).join("");
      } catch (err) {
        list.innerHTML = `<li style='color:red;'>Failed to load users.</li>`;
      }
    }