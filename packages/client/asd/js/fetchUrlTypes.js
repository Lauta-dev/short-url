/**
 * @typedef {Object} ScanResults
 * @property {number} code - Código de estado de la respuesta.
 * @property {Object} results - Resultados del análisis de la URL.
 * @property {string} results.date - Fecha y hora del informe.
 * @property {string} results.reportStatus - Estado del informe ("completed").
 * @property {ScanCategory} results.harmless - Motores que reportaron la URL como inofensiva.
 * @property {ScanCategory} results.undetected - Motores que no detectaron la URL.
 * @property {ScanCategory} results.suspicious - Motores que reportaron la URL como sospechosa.
 * @property {ScanCategory} results.malicious - Motores que reportaron la URL como maliciosa.
 */

/**
 * @typedef {Object} ScanCategory
 * @property {string[]} engineName - Lista de nombres de los motores de análisis.
 * @property {number} stats - Cantidad total de motores en esta categoría.
 */

/**
 * @type {ScanResults}
 */
const scanData = {
	code: 400,
	results: {
		date: "12/10/2024, 21:25:43",
		reportStatus: "completed",
		harmless: {
			engineName: [
				"Artists Against 419",
				"Acronis",
				"Abusix",
				// ...otros motores
			],
			stats: 67,
		},
		undetected: {
			engineName: [
				"AlphaSOC",
				"ArcSight Threat Intelligence",
				"AutoShun",
				// ...otros motores
			],
			stats: 28,
		},
		suspicious: {
			engineName: [],
			stats: 0,
		},
		malicious: {
			engineName: ["Quttera"],
			stats: 1,
		},
	},
};
