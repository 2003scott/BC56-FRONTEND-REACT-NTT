# Proyecto de Mini Market HTML , CSS Y TS

## Descripción
Esta es la segunda semana donde se migra todo el proyecyo market a typescript, esta solucion esta construida con vite(vanilla).

## Estructura de Carpetas

La estructura de carpetas del proyecto es la siguiente:

```
├─ public
├─ src
│  ├─ interface
│  │  └─ categories.d.ts
│  │  └─ products.d.ts
│  ├─ lib
│  │  └─ fecht.ts
│  └─ style
│  │  └─ footer.css
│  │  ├─ navbar.css
│  │  └─ products.css
│  ├─ ts
│  │  └─ app.ts
├─ .editorconfig
├─ .env
├─ .gitignore
├─ .prettierrc.json
├─ package.json
└─ style.css
```

src: Contiene la mayor parte del código fuente del proyecto.
--- ts: Incluye todo el código relacionado con TypeScript.
--- interface : Contiene el tipado de los fecht que es productos y categorias
--- lib: Almacena un custom fetch con funcionalidades personalizadas para realizar peticiones.
--- style: Contiene la mayoría de los estilos CSS del proyecto.
index.html: Contiene la estructura base del HTML.
style.css: Almacena los estilos globales aplicados en la aplicación.


## Instalación
Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```sh
npm install
```

## USO
Para iniciar la aplicación, utiliza el siguiente comando

```sh
npm run dev
```

## BUILD
Para hacer el build de la app, hacer un js , css y html, se creara un carpeta dist

```sh
npm run build
```
