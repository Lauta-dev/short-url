export default function goTo(url: string) {
	return `
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
      const limit = 3000
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
}
