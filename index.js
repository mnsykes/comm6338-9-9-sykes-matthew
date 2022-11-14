// Your code here
const URL = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = `8caf522b8811253c0984f6045871eab9`;
const form = document.querySelector("form");
const weatherEl = document.querySelector("#weather");
const input = document.querySelector("#weather-search");

form.onsubmit = async (e) => {
	e.preventDefault();
	const locale = input.value.trim();
	if (!locale) return;
	try {
		const queryString = `?q=${locale}&units=imperial&appid=${API_KEY}`;
		const fetchURL = `${URL}${queryString}`;

		clearForm();

		const res = await fetch(fetchURL);
		if (res.status !== 200) throw new Error(`Location not found`);
		const data = await res.json();

		showWeather(data);
	} catch (err) {
		weatherEl.textContent = err.message;
	}
};

const showWeather = ({
	name,
	dt,
	sys: { country },
	coord: { lat, lon },
	main: { temp, feels_like },
	weather: [{ description, icon }]
}) => {
	weatherEl.innerHTML = `
	    <h2>City: ${name}, ${country}</h2>
	    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">Click to view map</a>
	    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
	    <p style="text-transform: capitalize;">Description: ${description}</p><br>
	    <p>Actual Temp: ${temp}</p>
	    <p>Perceived: ${feels_like}</p>
	    <p>Last Updated: ${convertTime(dt)}</p>
	`;
};

const convertTime = (time) => {
	return new Date(time * 1000).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit"
	});
};

const clearForm = () => {
	weatherEl.innerHTML = "";
	input.value = "";
};
