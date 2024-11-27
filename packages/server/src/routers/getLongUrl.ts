import express, { Response, Request } from "express";
import getUrlById from "../db/getUrlById";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { code, url, error, errorType } = await getUrlById({ id });

	if (error) {
		res.status(code).json({
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

export default router;
