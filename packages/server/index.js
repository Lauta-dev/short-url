import express from "express";
import getUrlById from "./getUrlById.js";
import PushUrls from "./PushUrl.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/url/", async (req, res) => {
	/** @type {string} */
	const url = req.body.url;

	if (!url.startsWith("https://")) {
		return res.status(400).json({
			code: 400,
			error: "Enter a valid URL like https://example.com",
		});
	}

	const uuid = crypto.randomUUID().split("-")[0];
	const short = `${req.hostname}/short/${uuid}`;

	await PushUrls({
		url,
		id: uuid,
		short,
	});

	res.json({ short });
});

app.get("/short/:id", async (req, res) => {
	const { id } = req.params;
	const { code, url, error, errorType } = await getUrlById({ id });

	if (error) {
		return res.status(code).json({
			code,
			error,
			url,
			errorType,
		});
	}

	const html = `
    <head>
      <style>
        * {
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            'Open Sans',
            'Helvetica Neue',
            sans-serif;
        }
      </style>
      <title>Redirect to: ${url}</title>
    </head>

    <h2>
        Redirect to:
        <a href="${url}">${url}</a>
        <b id="delay"></b>
    </h2>
		<script>
      const limit = 5000
      const afterXSeconds = (second) =>
        \`after \${second}\ seconds\`

      let delay = 5

      setInterval(() => {
        if (delay > -1) {
          document
            .getElementById("delay")
            .textContent = afterXSeconds(delay)
          delay--;
      }
      }, 1000);

			setTimeout(() => {
				window.location.href = "${url}";
			}, limit);
		</script>
	`;

	res.send(html);
});

app.listen(port, () => {
	console.log(`Server listening in port: ${port}`);
});
