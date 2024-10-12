// types.js

/**
 * @typedef {Object} Link
 * @property {string} self
 * @property {string} item
 */

/**
 * @typedef {Object} EngineResult
 * @property {string} method
 * @property {string} engine_name
 * @property {string} category
 * @property {string} result
 */

/**
 * @typedef {Object} Stats
 * @property {number} malicious
 * @property {number} suspicious
 * @property {number} undetected
 * @property {number} harmless
 * @property {number} timeout
 */

/**
 * @typedef {Object} Attributes
 * @property {string} status
 * @property {number} date
 * @property {Object<string, EngineResult>} results
 * @property {Stats} stats
 */

/**
 * @typedef {Object} Data
 * @property {string} id
 * @property {string} type
 * @property {Link} links
 * @property {Attributes} attributes
 */

/**
 * @typedef {Object} UrlInfo
 * @property {string} id
 * @property {string} url
 */

/**
 * @typedef {Object} Meta
 * @property {UrlInfo} url_info
 */

/**
 * @typedef {Object} AnalysisData
 * @property {Data} data
 * @property {Meta} meta
 */
