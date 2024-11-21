let box, buttonCopy, successMessage;
const form = document.querySelector("form");

const resultDiv = document.querySelector("#result");

/** @type {HTMLParagraphElement} */
const shortUrlContent = document.querySelector("#shortUrl");

const inputUrl = document.getElementById("url");

/** @type {HTMLButtonElement} */
const btnPostUrl = document.getElementById("btn-post-url");

/** @type {HTMLButtonElement}*/
const btnOpenMenuMb = document.getElementById("btn-open-menu-mb");

/** @type {HTMLDivElement}*/
const outputContainer = document.querySelector(".output-container");

/** @type {HTMLDialogElement}*/
const vtReportModal = document.querySelector("#vt-report-modal");

/** @type {HTMLButtonElement}*/
const vtCloseReportModal = document.querySelector("#close-report-modal");

/** @param {ScanResults} report */
function generateReportModal(report) {
	/** @type {HTMLUListElement[]}*/
	const enginesContainer = document.querySelectorAll(".engine");

	// NOTE: por alguna razón puede dar undefined
	const { results } = report;

	// TODO: Hacer mejor uso de los errores
	if (!results) {
		return 0;
	}

	const { date, reportStatus } = results;

	enginesContainer.forEach((data) => {
		// Se obtiene el nombre de las categorias
		const categories = data.className.split(" ")[1];
		const { engineName, stats } = results[categories];
		document.getElementById(`${categories}-count`).textContent = stats;

		engineName.forEach((d) => {
			data.innerHTML += `<li>${d}</li>`;
		});
	});

	document.getElementById("report-state-value").textContent = reportStatus;
	document.getElementById("report-date-value").textContent = date;
}

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

	/** @type {ScanResults} */
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

	if (data.code !== 200) {
		generateReportModal(data);
		resultDiv.classList.remove("hidden");
		const outputContainer = document.querySelector(".output-container");
		outputContainer.innerHTML = `<p class="pico-color-red-500">
      El Link se reporto como malicioso, <b class="open-report-modal">Pulse aqui para ver el reporte</b>.
    </p>`;

		outputContainer.addEventListener(
			"click",
			() => (vtReportModal.open = true),
		);

		vtCloseReportModal.addEventListener("click", () => {
			vtReportModal.open = false;
		});

		return 0;
	}

	document.getElementById("result").classList.remove("hidden");
	document.getElementById("result").innerHTML = `
  <div>
    <code id="shortUrl" style="cursor: pointer;">${data.short}</code>
    <button id="copyBtn">Copiar</button>
  </div>

  <b id="successMessage" class="pico-color-green-400 hidden">URL copiada con éxito</b>
  `;

	box = document.querySelector("#shortUrl");
	buttonCopy = document.querySelector("#copyBtn");
	box.addEventListener("click", () => copyTextToClipboard());
	buttonCopy.addEventListener("click", () => copyTextToClipboard());

	successMessage = document.querySelector("#successMessage");
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
