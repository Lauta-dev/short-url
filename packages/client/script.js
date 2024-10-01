const box = document.querySelector(".app");
const input = document.querySelector("form");
const loading = document.getElementById("loading");

async function fetchUrl(url) {
	loading.style.display = "flex"; // Para mostrar un loading al enviar la petición

	const res = await fetch("http://localhost:3000/url", {
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

input.addEventListener("submit", async (event) => {
	event.preventDefault();
	const { url } = Object.fromEntries(new FormData(event.target));

	let data = await fetchUrl(url);

	box.innerHTML = `<code>${data.short}</code>`;
});
