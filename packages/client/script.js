const box = document.querySelector("#shortUrl");
const form = document.querySelector("form");
const loading = document.querySelector(".loading-container");

const resultDiv = document.querySelector("#result");

/** @type {HTMLButtonElement} */
const buttonCopy = document.querySelector("#copyBtn");

/** @type {HTMLParagraphElement} */
const shortUrlContent = document.querySelector("#shortUrl");

/** @type {HTMLDivElement}*/
const successMessage = document.querySelector("#successMessage");

/** @param {string} url */
async function fetchUrl(url) {
	loading.classList.remove("hidden"); // Para mostrar un loading al enviar la petición

	// prod:https://short-url-ebon-six.vercel.app/url

	const res = await fetch("http://localhost:3000/url", {
		method: "POST",
		body: JSON.stringify({ url }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const json = await res.json();

	loading.classList.add("hidden"); // Para mostrar un loading al enviar la petición

	return json;
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const { url } = Object.fromEntries(new FormData(event.target));

	let data = await fetchUrl(url);

	box.textContent = data.short;

	// Set output style
	resultDiv.classList.remove("hidden");
});

// Copiar URL al portapapeles

function copyTextToClipboard() {
	const content = box.textContent;
	successMessage.classList.remove("hidden");

	setTimeout(() => {
		successMessage.classList.add("hidden");
	}, 5000);

	navigator.clipboard.writeText(content);
}

box.addEventListener("click", () => copyTextToClipboard());
buttonCopy.addEventListener("click", () => copyTextToClipboard());
