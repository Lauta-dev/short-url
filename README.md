![screenshort](https://raw.githubusercontent.com/Lauta-dev/resource/refs/heads/main/short-url.webp)

# Short URL

Short URL es un acortador de enlaces simple y eficiente, construido con JavaScript y CSS. Permite acortar URLs largas para facilitar su uso y compartirlas.

## Características

- **Acortar URLs**: Transforma URLs largas en versiones más cortas.
- **Frontend simple**: Interfaz de usuario amigable y minimalista.
- **Backend**: Implementación de una API para gestionar URLs.

## Tecnologías utilizadas

- **JavaScript**/**TypeScrupt**
- **CSS**
- **HTML**
- **React**
- **Vercel** para el despliegue
- **Turso.tech** para el uso de la base de datos
- **SQLite**

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/lauta-dev/short-url.git
```

2. Instalar depenencias
```bash
pnpm install
```

3. Iniciar proyectos
```bash
pnpm run dev
```

## Diagrama de la base de datos

```mermaid
erDiagram
    users {
        TEXT id PK "NOT NULL UNIQUE"
        TEXT name "NOT NULL UNIQUE"
        TEXT password "NOT NULL"
        TEXT salt "NOT NULL"
        TIMESTAMP created_at "DEFAULT CURRENT_TIMESTAMP"
    }
    urls {
        TEXT id PK "NOT NULL UNIQUE"
        TEXT original_url "NOT NULL"
        TEXT short_url "NOT NULL"
        INTEGER is_active "NOT NULL DEFAULT '1'"
        TEXT user_id FK
        TIMESTAMP created_at "DEFAULT CURRENT_TIMESTAMP"
    }
    users ||--o{ urls : "user_id"
```

## [Métodos HTTP](./packages/server/endpoints.http)
