const box = document.querySelector("#shortUrl");
const form = document.querySelector("form");

const resultDiv = document.querySelector("#result");

/** @type {HTMLButtonElement} */
const buttonCopy = document.querySelector("#copyBtn");

/** @type {HTMLParagraphElement} */
const shortUrlContent = document.querySelector("#shortUrl");

/** @type {HTMLDivElement}*/
const successMessage = document.querySelector("#successMessage");

const inputUrl = document.getElementById("url");

/** @type {HTMLButtonElement} */
const btnPostUrl = document.getElementById("btn-post-url");

/** @type {HTMLButtonElement}*/
const btnOpenMenuMb = document.getElementById("btn-open-menu-mb");

/** @param {string} url */
async function fetchUrl(url) {
	btnPostUrl.textContent = "Generando URL espere...";
	btnPostUrl.setAttribute("aria-busy", "true");
	btnPostUrl.disabled = true;

	// prod:https://short-url-ebon-six.vercel.app/url

	const res = await fetch("https://short-url-ebon-six.vercel.app/url", {
		method: "POST",
		body: JSON.stringify({ url }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const json = await res.json();

	btnPostUrl.textContent = "Acortar";
	btnPostUrl.setAttribute("aria-busy", "false");
	btnPostUrl.disabled = false;

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

// # Input event
inputUrl.addEventListener("keyup", (event) => {
	btnPostUrl.disabled = true;
	/** @type {string | undefined}*/
	const v = event.target.value;

	/** @type {HTMLParagraphElement}*/
	const validInvalidHelper = document.querySelector(".valid-invalid-helper");

	if (!v) {
		validInvalidHelper.textContent = "Pegue una URL";
		return;
	}

	if (v.startsWith("https")) {
		validInvalidHelper.id = "valid-helper";
		inputUrl.setAttribute("aria-invalid", "false");
		inputUrl.setAttribute("aria-describedby", validInvalidHelper.id);
		validInvalidHelper.textContent = "URL valida";
		btnPostUrl.disabled = false;
		return;
	}

	validInvalidHelper.id = "invalid-helper";
	inputUrl.setAttribute("aria-invalid", "true");
	inputUrl.setAttribute("aria-describedby", validInvalidHelper.id);
	validInvalidHelper.textContent = "URL invalida";
});

// # Open btn menu
btnOpenMenuMb.addEventListener("click", () => {
	const navMb = document.getElementById("nav-mb");
	navMb.classList.toggle("nav-mb");
});
