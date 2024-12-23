const apiKey = process.env.VIRUSTOTAL_APIKEY || "";

async function scanUrl(url: string) {
	const options: RequestInit = {
		method: "POST",
		headers: {
			accept: "application/json",
			"x-apikey": apiKey,
			"content-type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ url }),
	};

	try {
		const response = await fetch(
			"https://www.virustotal.com/api/v3/urls",
			options,
		);

		if (!response.ok) {
			return {
				result: {},
				code: response.status,
			};
		}

		const { data } = await response.json();

		return {
			result: data,
			code: response.status,
		};
	} catch (error) {
		return {
			result: {},
			code: 500,
		};
	}
}

async function getReported(url: string) {
	try {
		const scanUrla = await scanUrl(url);

		if (scanUrla.code !== 200) {
			return scanUrla;
		}

		const reportedUrl = scanUrla.result.links.self;

		let response = await fetch(reportedUrl, {
			headers: { accept: "application/json", "x-apikey": apiKey },
		});

		let json = await response.json();

		let attributes = json.data.attributes;
		let reportStatus = attributes.status;
		const reportDate = attributes.date;

		// Es posible que al hacer la petición para obtener el reporte de virustotal
		// el estado este en espera (queued) espera. Este bucle se ejecuta hasta que el reporte este completo
		while (reportStatus !== "completed") {
			// Se espera 2 segundos hasta el proximo fetching de datos
			await new Promise((resolve) => setTimeout(resolve, 2000));

			response = await fetch(reportedUrl, {
				headers: { accept: "application/json", "x-apikey": apiKey },
			});

			// Si o si se debe reasignar variables
			json = await response.json();
			attributes = json.data.attributes;
			reportStatus = json.data.attributes.status;
		}

		const harmless: string[] = [];
		const undetected: string[] = [];
		const suspicious: string[] = [];
		const malicious: string[] = [];

		const results = attributes.results;
		const resultsKeys = Object.keys(results); // Como el reporte no se un array tengo que hacer esto

		resultsKeys.forEach((key) => {
			const { category, engine_name } = results[key];

			if (category === "harmless") harmless.push(engine_name);
			else if (category === "undetected") undetected.push(engine_name);
			else if (category === "suspicious") suspicious.push(engine_name);
			else if (category === "malicious") malicious.push(engine_name);
		});

		const options: Intl.DateTimeFormatOptions = {
			hour12: false, // Esto desactiva el formato de 12 horas
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		};

		const formatedUnixDate = new Date(reportDate * 1000).toLocaleString(
			"es-AR",
			options,
		);

		const returnCode = (code: number) => ({
			code: code,
			results: {
				date: formatedUnixDate,
				reportStatus,
				harmless: {
					engineName: harmless,
					stats: attributes.stats.harmless,
				},
				undetected: {
					engineName: undetected,
					stats: attributes.stats.undetected,
				},
				suspicious: {
					engineName: suspicious,
					stats: attributes.stats.suspicious,
				},
				malicious: {
					engineName: malicious,
					stats: attributes.stats.malicious,
				},
			},
		});

		return malicious.length > 0 ? returnCode(403) : returnCode(200);
	} catch (error) {
		return {
			code: 500,
			results: {},
		};
	}
}

export default getReported;
