const expiredMessageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL Vencida</title>
  <style>
    :root {
      --color-background: #f8f9fa;
      --color-border: #e4e4e7;
      --color-foreground: #4b5563;
      --color-primary: #2563eb;
      --color-destructive: #dc2626;
      --color-muted: #f1f5f9;
    }

    body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      color: var(--color-foreground);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
      padding: 16px;
    }

    .container {
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 24px;
      max-width: 400px;
      text-align: center;
    }

    .container h1 {
      font-size: 1.5rem;
      margin: 0;
    }

    .container p {
      margin: 12px 0 16px;
      font-size: 1rem;
      color: var(--color-foreground);
    }

    .container a {
      text-decoration: none;

    }

    .outline-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: transparent;
  color: var(--text-color, #000);
  border: 1px solid var(--border-color, #e2e8f0);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.outline-button:hover {
  background-color: var(--hover-bg-color, #f1f5f9);
  color: var(--hover-text-color, #000);
}

.outline-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--focus-ring-color, #94a3b8);
}

.outline-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Optional: Add a specific color theme */
.outline-button.blue {
  --border-color: #3b82f6;
  --text-color: #3b82f6;
  --hover-bg-color: #3b82f6;
  --hover-text-color: #ffffff;
  --focus-ring-color: #93c5fd;
}


  </style>
</head>
<body>
  <div class="container">
    <h1>URL Vencida</h1>
    <p>La URL que intentaste acceder ya no está disponible porque su tiempo de validez ha expirado.</p>
    <a href="/" class="outline-button">Volver al inicio</a>
  </div>
</body>
</html>
`;

export default expiredMessageHtml;
