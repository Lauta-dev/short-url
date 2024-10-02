# Short URL

Short URL es un acortador de enlaces simple y eficiente, construido con JavaScript y CSS. Permite acortar URLs largas para facilitar su uso y compartirlas.

## Características

- **Acortar URLs**: Transforma URLs largas en versiones más cortas.
- **Frontend simple**: Interfaz de usuario amigable y minimalista.
- **Backend**: Implementación de una API para gestionar URLs.

## Tecnologías utilizadas

- **JavaScript**
- **CSS**
- **HTML**
- **Vercel** para el despliegue

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/lauta-dev/short-url.git
```

2. Instalar depenencias
```bash 
cd packages/server
pnpm i
```

3. Iniciar proyectos
> Para levantar un servidor web uso [live-server](https://www.npmjs.com/package/live-server)

```bash 
cd packages/client
live-server
```
> Levanta en: http://localhost:8080

```bash 
cd packages/server
pnpm start dev
```
> Levanta en: http://localhost:3000

## Métodos
- `POST /api/shorten`:
Crea una URL corta a partir de una URL larga. Recibe un cuerpo JSON con la propiedad url.
Retorna un objeto con la URL corta generada y otros metadatos.

- `GET /:id`:
Redirige a la URL original asociada con el identificador corto (id).
Si no encuentra la URL, retorna un error 404.
