const esbuild = require("esbuild");
const depedencies = Object.keys(require("./package.json").dependencies);

esbuild
	.build({
		entryPoints: ["index.ts"],
		bundle: true,
		outfile: "dist/bundle.cjs",
		minify: true,
		platform: "node",
		format: "cjs",
		external: depedencies,
		treeShaking: true,
	})
	.then(() => console.log("✅ Bundled successfully."))
	.catch((error) => console.error(error));
