const box = document.querySelector(".output");
const form = document.querySelector("form");
const loading = document.getElementById("loading");

console.log(form);

/** @type {HTMLButtonElement} */
const buttonCopy = document.querySelector(".output_button_hide");

/**
 * @type {HTMLParagraphElement}  // Describe el tipo de elemento
 * @description Elemento de párrafo que muestra un mensaje de éxito en la interfaz.
 */
const successMessage = document.querySelector(".successMessage");

/** @param {string} url */
async function fetchUrl(url) {
	loading.style.display = "flex"; // Para mostrar un loading al enviar la petición

	const res = await fetch("https://short-url-ebon-six.vercel.app/url", {
		method: "POST",
		body: JSON.stringify({ url }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const json = await res.json();

	loading.style.display = "none"; // Vuelve a su esta inicial

	return json;
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const { url } = Object.fromEntries(new FormData(event.target));

	let data = await fetchUrl(url);

	box.textContent = data.short;

	// Set output style
	box.classList.remove("output");
	box.classList.add("output_success");

	// Set button style
	buttonCopy.classList.remove("output_button_hide");
	buttonCopy.classList.add("output_button");
});

// Copiar URL al portapapeles

function copyTextToClipboard() {
	const content = box.textContent;

	successMessage.classList.remove("copy_disable");
	successMessage.classList.add("copy_success");

	setTimeout(() => {
		successMessage.classList.remove("copy_success");
		successMessage.classList.add("copy_disable");
	}, 5000);

	navigator.clipboard.writeText(content);
}

box.addEventListener("click", () => copyTextToClipboard());
buttonCopy.addEventListener("click", () => copyTextToClipboard());
